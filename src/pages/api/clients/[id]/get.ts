import type { APIRoute } from "astro";
import { XataClient } from "../../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const GET: APIRoute = async ({ params }) => {
    const id = params.id

    if (!id) {
        return new Response(
            JSON.stringify(
                { message: "/clients/[id]/get is missing a url param. This should be a client's record id" }
            ),
            { status: 400 }
        );
    }

    try {
        const client = await xata.db.clients.readOrThrow(id);
        return new Response(
            JSON.stringify({ client }),
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

