import axios from "axios";
import { atom } from "nanostores";
import toast from "react-hot-toast";
import type { OrdersRecord } from "../xata";
import { $isLoading } from "./loading";

export const $ordersStore = atom<OrdersRecord[]>([])


export async function getOrders() {
    try {
        $isLoading.set(true)
        const response = await axios.get("http://localhost:4321/api/orders/all");
        const data: OrdersRecord[] = await response.data;
        $ordersStore.set(data)
    } catch (error: unknown) {
        $isLoading.set(false)
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error(
                "An unknown error has occured, and has been automatically logged. Please try this action again later",
            );
        }
    } finally {
        $isLoading.set(false)
    }
}
