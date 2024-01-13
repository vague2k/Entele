import type { APIRoute } from "astro";
import { XataClient, type Clients } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const PUT: APIRoute = async ({ params, request }) => {
    const id = params.id

    if (!id) {
        return new Response(
            JSON.stringify(
                { message: "/clients/[id]/update is missing a url param. This should be a client's record id" }
            ),
            { status: 400 }
        );
    }

    try {
        const formBody: Clients = await request.json();

        if (!formBody.name && !formBody.email && !formBody.amountOfOrders) {
            return new Response(
                JSON.stringify({ message: "You must fill out at least 1 field to update this record." }),
                { status: 400 }
            );
        }

        if (!formBody.email) {
            const client = await xata.db.clients.readOrThrow(id);
            formBody.email = client.email
        }

        if (!formBody.name) {
            const client = await xata.db.clients.readOrThrow(id);
            formBody.name = client.name
        }

        const updatedClient = await xata.db.clients.update(id, formBody);

        return new Response(
            JSON.stringify({ updatedClient, message: "Client has been updated!" }),
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

