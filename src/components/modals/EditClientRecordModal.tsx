import axios from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { BiEdit, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import { ConfirmActionModal, OnSuccessModal } from "./GeneralModals";
import type { ModalProps } from "./types";

export default function EditRecordModal({
  isOpen,
  onClose,
  clientInfo,
  refreshIfDataChange,
}: ModalProps) {
  if (!isOpen) return null;

  const [id, name, email, amountOfOrders] = clientInfo || ["", "", "", 0];

  const [clientFormData, setClientFormData] = useState({
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
      value !== "" && name === "amountOfOrders" ? parseInt(value, 10) : value;
    setClientFormData({ ...clientFormData, [name]: isNumericValue });
  }

  async function deleteRecord(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await axios.delete(`/api/clients/${id}/delete`, {
        headers: { "Content-Type": "application/json" },
      });

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
        `/api/clients/${id}/update`,
        clientFormData,
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

  // const editmessage = `${clientFormData.name}, ${clientFormData.email}, ${clientFormData.orderAmount}`

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      {!onSuccess && !isConfirmAction && (
        <Box className="relative h-fit w-fit max-w-lg p-8">
          <div className="flex flex-col justify-center gap-y-3 items-center">
            <Button
              onClick={onClose}
              type="button"
              className="absolute right-3 top-3 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
            >
              <BiX size={20} />
            </Button>
            <div className="flex justify-center items-center w-11 h-11 rounded-full bg-primary-200">
              <BiEdit size={25} className="text-primary-500" />
            </div>
            <h1 className="font-semibold text-lg text-base-950">Edit Record</h1>
            <p className="flex flex-col pb-3 font-regular text-sm text-center text-base-500">
              The client's current information are placeholders in the input
              fields below.
            </p>

            <Input
              onChange={onChange}
              name="name"
              value={clientFormData.name}
              placeholder={`Current name: ${name}`}
            />
            <Input
              onChange={onChange}
              name="email"
              value={clientFormData.email}
              placeholder={`Current email: ${email}`}
            />
            <Input
              onChange={onChange}
              name="amountOfOrders"
              value={clientFormData.amountOfOrders}
              placeholder={`Current order amount: ${amountOfOrders}`}
            />
          </div>

          <div className="flex justify-center items-center gap-x-3 pt-3">
            <Button
              onClick={onClose}
              type="button"
              className="bg-fill-100 hover:bg-fill-200 duration-300 text-base-950"
            >
              Cancel edits
            </Button>

            <Button
              onClick={(event) => {
                updateRecord(event);
              }}
              type="submit"
              className="bg-primary-400 hover:bg-primary-300 duration-300 text-neutral-50"
            >
              Update record
            </Button>
            <Button
              onClick={() => setIsConfirmAction(true)}
              type="submit"
              className="bg-red-600 hover:bg-red-500 duration-300 text-neutral-50"
            >
              Delete record?
            </Button>
          </div>
        </Box>
      )}

      {!onSuccess && isConfirmAction && (
        <ConfirmActionModal
          onClose={onClose}
          callback={(event) => {
            deleteRecord(event);
          }}
          header={`Delete ${clientFormData.name}?`}
          description={`You're about about to delete ${clientFormData.name}. Would you like to continue?`}
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
