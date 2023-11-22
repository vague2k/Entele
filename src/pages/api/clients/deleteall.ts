import type { APIRoute } from "astro";
import { XataClient, type ClientsRecord } from "../../../xata";

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const DELETE: APIRoute = async () => {

    await xata.sql<ClientsRecord>`DELETE FROM clients`;

    return new Response(
        JSON.stringify({ message: "All records for clients have been deleted. This is permanent." }), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    )

}
