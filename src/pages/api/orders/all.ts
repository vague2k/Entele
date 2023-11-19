import type { APIRoute } from "astro"
import { XataClient } from "../../../xata"

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const GET: APIRoute = async () => {

    const orders = await xata.db.orders.getAll()

    return new Response(
        JSON.stringify(orders), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    )

}

