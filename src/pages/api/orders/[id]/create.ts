import type { APIRoute } from "astro";
import { XataClient, type Orders } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const POST: APIRoute = async ({ params }) => {
    const id = params.id

    try {

        if (!id) {
            return new Response(
                JSON.stringify(
                    { message: "/orders/[id]/create is missing a url param. This should be a client's record id" }
                ),
                { status: 400 }
            );
        }

        // get client based on url parameter which is the id of this specific client's record 
        const client = await xata.db.clients.read(id)
        if (client === null) {
            return new Response(
                JSON.stringify({ message: 'This client does not exist, please check the id again' }),
                { status: 400 }
            );
        }

        // get query object filtered by if the order relationship is null and by the clients name and email
        /*
         * We filter by these parameters to make sure an order detail that already has a specific order 
         * associated with it does not get summarized into our new order later on
         */

        const filteredDetail = xata.db.order_details
            .filter({ $notExists: "orders" })
            .filter({ clientName: client.name, clientEmail: client.email })

        // summarize data with Xata specific API operations on all order details 
        // this returns an array of 1 single object
        // [0]'th index will be used to select the object's properties later on
        const summarized = await filteredDetail.summarize({
            summaries: {
                totalAmount: { sum: "subtotal" },
                totalUnits: { sum: "units" },
                averageUnitPrice: { average: "unitPrice" }
            }
        })
        const summaries = summarized.summaries[0]

        // construct order object based on data proccessed above
        const newOrderObject: Orders = {
            totalAmount: summaries.totalAmount,
            totalUnits: summaries.totalUnits,
            averageUnitPrice: summaries.averageUnitPrice,
            orderDate: new Date(),
            complete: false,
            // FIX: Works as intended but this type error is getting annoying to look at
            clients: { id: id }
        }

        // Finally, create a new orders
        // Update the respective client's <amountOfOrders> count by incrementing by 1
        // select all id's from filtered details, and update the orders field associated on that id
        const newOrder = await xata.db.orders.create(newOrderObject)
        await xata.db.clients.update(id, { amountOfOrders: { $increment: 1 } })

        const test = await filteredDetail.select(["id"]).getMany()
        for (const orderDetail of test) {
            await xata.db.order_details.update(orderDetail.id, { orders: newOrder.id })
        }

        return new Response(
            JSON.stringify({ newOrder, message: "New order created!" }),
            {
                status: 201,
                headers: { "Content-Type": "application/json" }
            }
        );
    } catch (error) {
        console.error(error);

        return new Response(
            JSON.stringify({ message: error }),
            { status: 500 }
        );
    }
};
