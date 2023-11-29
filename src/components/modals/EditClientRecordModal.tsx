import { BiEdit, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import type { ModalProps } from "./types";

export default function EditRecordModal({
  isOpen,
  onClose,
  clientInfo,
}: ModalProps) {
  if (!isOpen) return null;

  const [name, email, orderAmount] = clientInfo || ["", "", 0];

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-neutral-400 bg-opacity-30 backdrop-blur-sm">
      <Box className="relative h-fit w-fit max-w-lg p-8">
        <div className="flex flex-col justify-center gap-y-3 items-center">
          <Button
            onClick={onClose}
            type="button"
            className="absolute right-3 top-3 bg-transparent hover:bg-neutral-200 duration-300 text-neutral-800"
          >
            <BiX size={20} />
          </Button>
          <div className="flex justify-center items-center w-11 h-11 rounded-full bg-blue-200">
            <BiEdit size={25} className="text-blue-500" />
          </div>
          <h1 className="font-semibold text-lg text-neutral-800">
            Edit Record
          </h1>
          <p className="flex flex-col pb-3 font-regular text-sm text-center text-neutral-500">
            <span>Client's Info</span>
            <span>{name}</span>
            <span>{email}</span>
          </p>

          <Input value={name} />
          <Input value={email} />
          <Input value={orderAmount} />
        </div>

        <div className="flex justify-center items-center gap-x-3 pt-3">
          <Button
            onClick={onClose}
            type="button"
            className="bg-neutral-200 hover:bg-neutral-300 duration-300 text-neutral-800"
          >
            Cancel edits
          </Button>

          <Button
            type="button"
            className="bg-blue-500 hover:bg-blue-400 duration-300 text-neutral-50"
          >
            Update record
          </Button>
          <Button
            type="button"
            className="bg-red-600 hover:bg-red-500 duration-300 text-neutral-50"
          >
            Delete record?
          </Button>
        </div>
      </Box>
    </div>
  );
}
