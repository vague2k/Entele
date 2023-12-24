import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const DELETE: APIRoute = async ({ params }) => {
    const id = params.id

    if (!id) {
        return new Response(
            JSON.stringify(
                { message: "/clients/[id]/delete is missing a url param. This should be a client's record id" }
            ),
            { status: 400 }
        );
    }

    try {
        const deletedClient = await xata.db.clients.delete(id);
        return new Response(
            JSON.stringify({ deletedClient, message: "Client has been deleted." }),
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

