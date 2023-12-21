import type { APIRoute } from "astro";
import { XataClient, type Orders } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const POST: APIRoute = async ({ params }) => {
    const id = params.id

    try {

        if (id === undefined) {
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
        const filteredDetail = xata.db.order_details
            .filter({ $notExists: "orders" })
            .filter({ clientName: client?.name, clientEmail: client?.email })

        // aggregate data with Xata specific API operations on all order details 
        // this returns an array of 1 single object
        // [0]'th index will be used to select the object's properties later on
        const summarized = await filteredDetail.summarize({
            summaries: {
                totalAmount: { sum: "subtotal" },
                totalUnits: { sum: "units" },
                averageUnitPrice: { average: "unitPrice" }
            }
        })

        // construct order object based on data proccessed above
        // TODO: How can we increment the amountOfOrders count whenever an order is placed?
        const newOrderObject: Orders = {
            totalAmount: summarized.summaries[0].totalAmount,
            totalUnits: summarized.summaries[0].totalUnits,
            averageUnitPrice: summarized.summaries[0].averageUnitPrice,
            orderDate: new Date(),
            complete: false,
            clients: {
                id: id,
                name: client.name,
                email: client.email,
                amountOfOrders: client.amountOfOrders
            }
        }

        const newOrder = await xata.db.orders.create(newOrderObject)

        return new Response(
            JSON.stringify({ newOrder, message: "check log" }),
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

