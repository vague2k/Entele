
export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    header?: string;
    description?: string;
    refreshIfDataChange: () => void
    clientInfo?: [string, string, number]
    totalRecords?: number | 0
}
