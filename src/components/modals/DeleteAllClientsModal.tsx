import axios from "axios";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import type { ModalProps } from "./types";

export default function ConfirmDeleteModal({
  visible,
  onClose,
  header,
  description,
  icon: Icon,
  refreshIfDataChange,
}: ModalProps & { refreshIfDataChange: () => void }) {
  if (!visible) return null;

  async function handleDeleteAllRecords() {
    try {
      const response = await axios.delete("/api/clients/deleteall", {
        headers: { "Content-Type": "application/json" },
      });

      refreshIfDataChange();
      toast.success(response.data.message);
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
          <div className="flex justify-center items-center w-11 h-11 rounded-full bg-red-200">
            <Icon size={25} className="text-red-500" />
          </div>
          <h1 className="font-semibold text-lg text-neutral-800">{header}</h1>
          <p className="font-regular text-sm text-center text-neutral-500">
            {description}
          </p>
        </div>
        <div className="flex justify-center items-center gap-x-3 pt-3">
          <Button
            onClick={onClose}
            type="button"
            className="bg-neutral-200 hover:bg-neutral-100 duration-300 text-neutral-800"
          >
            No, cancel everything
          </Button>
          <Button
            onClick={handleDeleteAllRecords}
            type="button"
            className="bg-red-600 hover:bg-red-500 duration-300 text-neutral-50"
          >
            Yes, Delete all records
          </Button>
        </div>
      </Box>
    </div>
  );
}
