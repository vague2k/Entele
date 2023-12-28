import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import type { DeleteAllClientsModalProps } from "../../types";
import Box from "../ui/Box";
import Button from "../ui/Button";
import { OnSuccessModal } from "./GeneralModals";

export default function ConfirmDeleteModal({
  isOpen,
  onClose,
  totalRecords,
  refreshIfDataChange,
}: DeleteAllClientsModalProps) {
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
        <Box className="relative h-fit w-full rounded-xl max-w-lg p-7">
          <div className="relative items-center">
            <Button
              onClick={onClose}
              type="button"
              className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
            >
              <BiX size={20} />
            </Button>
            <div className="mr-auto">
              <h1 className="font-medium text-lg text-left text-base-900">
                Delete all {totalRecords} records of clients?
              </h1>
              <p className="font-regular text-sm text-left w-96 text-base-500">
                Are you sure you want to delete all records of clients? This
                action cannot be undone.
              </p>
            </div>
          </div>
          <div className="flex justify-end items-center gap-x-2 pt-6">
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
              Yes, I'm sure
            </Button>
          </div>
        </Box>
      )}
      {onSuccess && (
        <OnSuccessModal
          header="All clients have been deleted"
          description="Hopefully this wasn't a accident..."
          onClose={onClose}
        />
      )}
    </div>
  );
}
