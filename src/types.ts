import type { Clients } from "./xata";

export type ModalProps = {
    isOpen: boolean;
    onClose: () => void; // This function SHOULD be a useReducer dispatch func that toggles a boolean state
    refreshIfDataChange: () => void
}

export interface EditClientRecordModalProps extends ModalProps {
    clientInfo: Clients
}

export interface DeleteAllClientsModalProps extends ModalProps {
    totalRecords: number | 0
}

export enum TableType {
    ClientsTable = "ClientsTable",
    OrdersTable = "OrdersTable",
}
