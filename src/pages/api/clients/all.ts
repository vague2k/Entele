import type { APIRoute } from "astro"
import { XataClient } from "../../../xata"

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const GET: APIRoute = async () => {

    const clients = await xata.db.clients.getAll()

    return new Response (
        JSON.stringify(clients), {
            status: 200,
            headers: {
                "Content-Type": "application/json"
            }
        }
    )

}
