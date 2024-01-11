import axios from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import type { EditClientRecordModalProps } from "../../types";
import Box from "../ui/Box";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { ConfirmActionModal, OnSuccessModal } from "./GeneralModals";

export default function EditRecordModal({
  isOpen,
  onClose,
  currentClient,
  refreshIfDataChange,
}: EditClientRecordModalProps) {
  if (!isOpen) return null;

  const [editedClient, setEditedClient] = useState({
    id: "",
    name: "",
    email: "",
    amountOfOrders: 0,
  });
  const [onSuccess, setOnSuccess] = useState(false);
  const [isConfirmAction, setIsConfirmAction] = useState(false);
  const [successHeader, setSuccessHeader] = useState("");
  const [successDescription, setSuccessDescription] = useState("");

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const isNumericValue =
      value !== "" && name === "amountOfOrders" && Number.isNaN(value)
        ? parseInt(value, 10)
        : value;
    setEditedClient({ ...editedClient, [name]: isNumericValue });
  }

  async function deleteRecord(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await axios.delete(
        `/api/clients/${currentClient.id}/delete`,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      refreshIfDataChange();
      setSuccessHeader(response.data.message);
      setSuccessDescription("You cannot undo this action.");
      setOnSuccess(true);
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

  async function updateRecord(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await axios.put(
        `/api/clients/${currentClient.id}/update`,
        editedClient,
        {
          headers: { "Content-Type": "application/json" },
        },
      );

      refreshIfDataChange();
      setSuccessHeader(response.data.message);
      setSuccessDescription("Remember you can always update this again later!");
      setIsConfirmAction(false);
      setOnSuccess(true);

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
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      {!onSuccess && !isConfirmAction && (
        <Box className="relative h-fit w-full max-w-[430px] p-8">
          <div className="relative items-center">
            <Button
              onClick={onClose}
              type="button"
              className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100"
            >
              <BiX size={20} />
            </Button>
            <div className="mr-auto">
              <h1 className="font-medium text-lg text-base-900">Edit Record</h1>
              <p className="flex w-80 font-normal text-sm text-left text-base-500">
                The client's current information are placeholders in the input
                fields below.
              </p>
            </div>

            <div className="pt-6">
              <label
                htmlFor="name"
                className="text-sm mb-1 ml-1 mr-auto text-base-900"
              >
                Name
              </label>
              <Input
                id="name"
                onChange={onChange}
                name="name"
                value={editedClient.name}
                placeholder={`Current name: ${currentClient.name}`}
                className="mb-2"
              />
              <label
                htmlFor="email"
                className="text-sm mb-1 ml-1 mr-auto text-base-900"
              >
                Email
              </label>
              <Input
                id="email"
                onChange={onChange}
                name="email"
                value={editedClient.email}
                placeholder={`Current email: ${currentClient.email}`}
                className="mb-2"
              />
              <label
                htmlFor="amountOfOrders"
                className="text-sm mb-1 ml-1 mr-auto text-base-900"
              >
                Number of orders
              </label>
              <Input
                id="amountOfOrders"
                onChange={onChange}
                name="amountOfOrders"
                value={editedClient.amountOfOrders}
                placeholder={`Current order amount: ${currentClient.amountOfOrders}`}
                className="mb-2"
              />
            </div>
          </div>

          <div className="flex flex-row pt-7 mr-auto gap-x-1">
            <Button
              onClick={() => setIsConfirmAction(true)}
              type="submit"
              className="bg-red-600 hover:bg-red-500 text-neutral-50"
            >
              Delete?
            </Button>
            <div className="flex ml-auto gap-x-1">
              <Button onClick={onClose} type="button">
                Cancel
              </Button>

              <Button
                onClick={(event) => {
                  updateRecord(event);
                }}
                type="submit"
                className="bg-primary-400 hover:bg-primary-300 text-neutral-50"
              >
                Save Changes
              </Button>
            </div>
          </div>
        </Box>
      )}

      {!onSuccess && isConfirmAction && (
        <ConfirmActionModal
          onClose={onClose}
          callback={(event) => {
            deleteRecord(event);
          }}
          header="Delete this client?"
          description="You're about about to delete a client! Are you sure you would you like to continue?"
        />
      )}

      {onSuccess && (
        <OnSuccessModal
          onClose={onClose}
          header={successHeader}
          description={successDescription}
        />
      )}
    </div>
  );
}
