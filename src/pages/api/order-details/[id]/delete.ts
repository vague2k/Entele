import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const DELETE: APIRoute = async ({ params }) => {
    const id = params.id

    if (!id) {
        return new Response(
            JSON.stringify(
                { message: "/order-details/[id]/delete is missing a url param. This should be a order detail's record id" }
            ),
            { status: 400 }
        );
    }

    try {
        const deletedOrderDetail = await xata.db.order_details.delete(id);
        return new Response(
            JSON.stringify({ deletedOrderDetail, message: "Order detail has been deleted." }),
            {
                status: 200,
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

