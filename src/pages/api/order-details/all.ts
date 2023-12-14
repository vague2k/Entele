import type { APIRoute } from "astro"
import { XataClient } from "../../../xata"

const xata = new XataClient({ apiKey: import.meta.env.XATA_API_KEY })

export const GET: APIRoute = async () => {

    const orderDetails = await xata.db.order_details.getAll()

    return new Response(
        JSON.stringify(orderDetails), {
        status: 200,
        headers: {
            "Content-Type": "application/json"
        }
    }
    )

}
