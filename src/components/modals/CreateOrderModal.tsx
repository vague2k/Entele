import { BiX } from "react-icons/bi";
import type { ModalProps } from "../../types";
import Box from "../Box";
import Button from "../Button";

export default function CreateOrderModal({ isOpen, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      <Box className="relative h-fit w-fit max-w-lg p-8">
        <form>
          <Button
            onClick={onClose}
            type="button"
            className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
          >
            <BiX size={20} />
          </Button>
          <h1>CREATE orders modal</h1>
          <Button
            onClick={onClose}
            type="button"
            className="bg-fill-100 hover:bg-fill-200 duration-300 text-base-950"
          >
            Cancel
          </Button>
        </form>
      </Box>
    </div>
  );
}
