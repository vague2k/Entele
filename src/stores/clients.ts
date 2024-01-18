import axios from "axios";
import { atom } from "nanostores";
import toast from "react-hot-toast";
import type { ClientsRecord } from "../xata";
import { $isLoading } from "./loading";

export const $clientsStore = atom<ClientsRecord[]>([])

export async function createClient(payload: object, refreshCallback: () => void) {
    try {
        await axios.post("/api/clients/create", payload, {
            headers: { "Content-Type": "application/json" },
        });
        refreshCallback()
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error(
                "An unknown error has occured, and has been automatically logged. Please try this action again later",
            );
        }
    }
}

export async function deleteAllClients(refreshCallback: () => void) {
    try {
        await axios.delete("/api/clients/deleteall", {
            headers: { "Content-Type": "application/json" },
        });

        // TODO: handle if delete all button is clicked when there is no data to delete

        refreshCallback()
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error(
                "An unknown error has occured, and has been automatically logged. Please try this action again later",
            );
        }
    }
}

export async function getClients(): Promise<ClientsRecord[] | null> {
    try {
        $isLoading.set(true)
        const response = await axios.get("http://localhost:4321/api/clients/all");
        const data: ClientsRecord[] = await response.data;
        $clientsStore.set(data)
        $isLoading.set(false)
        return $clientsStore.get()
    } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
            toast.error(error.response?.data.message);
        } else {
            toast.error(
                "An unknown error has occured, and has been automatically logged. Please try this action again later",
            );
        }
        return null
    } finally {
        $isLoading.set(false)
    }
}
