import type { APIRoute } from "astro"
import { XataClient } from "../../../xata"

interface NewClientFormBody {
    name: string
    email: string
    amountOfOrders: number
}

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const POST: APIRoute = async ({ request }) => {
    try {

        const formBody: NewClientFormBody = await request.json();
        if (!formBody.name || !formBody.email) {
            return new Response(
                JSON.stringify({ message: "Missing required field" }),
                { status: 400 }
            );
        }

        const newClient = await xata.db.clients.create(formBody);

        return new Response(
            JSON.stringify({ newClient, message: "New client created!" }),
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

