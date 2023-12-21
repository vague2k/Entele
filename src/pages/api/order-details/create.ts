import type { APIRoute } from "astro";
import { XataClient, type OrderDetails } from "../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

// The idea for route, is to create an order detail with a clientId attatched to it. 
// And based on the clientId, we can create an order out of it at a later time.
export const POST: APIRoute = async ({ request }) => {
    try {

        const formBody: OrderDetails = await request.json();

        if (
            !formBody.clientName
            || !formBody.clientEmail
            || !formBody.units
            || !formBody.unitPrice
            || !formBody.garmentBrand
            || !formBody.garmentType
            || !formBody.garmentCode
            || !formBody.garmentColor
        ) {
            return new Response(
                JSON.stringify({ message: "Missing required field" }),
                { status: 400 }
            );
        }

        const clientExists = await xata.db.clients
            .filter({ name: formBody.clientName, email: formBody.clientEmail })
            .getMany()

        if (clientExists.length <= 0) {
            return new Response(
                JSON.stringify({
                    message: "This client does not exist, please check the client's name and email again!"
                }),
                { status: 400 }
            );
        }

        formBody.subtotal = formBody.unitPrice * formBody.units

        const newOrderDetail = await xata.db.order_details.create(formBody);

        return new Response(
            JSON.stringify({ newOrderDetail, message: "Order detail created!" }),
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

