import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiTrash, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import { OnSuccessModal } from "./GeneralModals";
import type { ModalProps } from "./types";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  totalRecords,
  refreshIfDataChange,
}: ModalProps) {
  if (!isOpen) return null;

  const [onSuccess, setOnSuccess] = useState(false);
  async function handleDeleteAllRecords() {
    try {
      await axios.delete("/api/clients/deleteall", {
        headers: { "Content-Type": "application/json" },
      });

      // TODO: handle if delete all button is clicked when there is no data to delete

      setOnSuccess(true);
      refreshIfDataChange();
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
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      {!onSuccess && (
        <Box className="relative h-fit w-fit max-w-lg p-8">
          <div className="flex flex-col justify-center gap-y-3 items-center">
            <Button
              onClick={onClose}
              type="button"
              className="absolute right-3 top-3 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
            >
              <BiX size={20} />
            </Button>
            <div className="flex justify-center items-center w-11 h-11 rounded-full bg-red-200">
              <BiTrash size={25} className="text-red-500" />
            </div>
            <h1 className="font-semibold text-lg text-base-950">
              Delete all {totalRecords} records of clients?
            </h1>
            <p className="font-regular text-sm text-center text-base-500">
              Are you sure you want to delete all records of clients? This
              action cannot be undone
            </p>
          </div>
          <div className="flex justify-center items-center gap-x-3 pt-3">
            <Button
              onClick={onClose}
              type="button"
              className="bg-fill-100 hover:bg-fill-200 duration-300 text-base-950"
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
      )}
      {onSuccess && (
        <OnSuccessModal
          header="All clients have been deleted"
          onClose={onClose}
        />
      )}
    </div>
  );
}
