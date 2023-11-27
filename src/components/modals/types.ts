import type { ReactEventHandler } from "react";
import type { IconType } from "react-icons";

export interface ModalProps {
    header: string;
    description: string;
    icon: IconType;
    visible: boolean;
    onClose: ReactEventHandler;
}

export interface EditRecordModalProps extends ModalProps {
    clientName: string;
    clientEmail: string;
    clientOrderAmount: number;
}
