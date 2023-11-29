import type { ReactEventHandler } from "react";

export interface ModalProps {
    isOpen: boolean;
    onClose: ReactEventHandler;
    header?: string;
    description?: string;
    refreshIfDataChange: () => void
    clientInfo?: [string, string, number]
    totalRecords?: number | 0
}
