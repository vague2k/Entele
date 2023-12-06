import axios from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { BiUserPlus, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import { OnSuccessModal } from "./GeneralModals";
import type { ModalProps } from "./types";

export default function CreateClientModal({
  isOpen,
  onClose,
  refreshIfDataChange,
}: ModalProps & { refreshIfDataChange: () => void }) {
  if (!isOpen) return null;

  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
  });
  const [onSuccess, setOnSuccess] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setClientFormData({ ...clientFormData, [name]: value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      await axios.post("/api/clients/create", clientFormData, {
        headers: { "Content-Type": "application/json" },
      });

      refreshIfDataChange();
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

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      {!onSuccess && (
        <Box className="relative h-fit w-fit max-w-lg p-8">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="relative flex flex-col justify-center gap-y-3 items-center">
              <Button
                onClick={onClose}
                type="button"
                className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
              >
                <BiX size={20} />
              </Button>
              <div className="flex justify-center items-center w-11 h-11 rounded-full bg-primary-200">
                <BiUserPlus size={25} className="text-primary-500" />
              </div>
              <h1 className="font-semibold text-lg text-base-950">
                Create a new client
              </h1>

              <Input
                onChange={onChange}
                name="name"
                value={clientFormData.name}
                placeholder="Name"
              />
              <Input
                onChange={onChange}
                name="email"
                value={clientFormData.email}
                placeholder="Email"
              />

              <p className="pb-3 font-regular text-sm text-center text-base-500">
                The new client will have 0 orders by default. Don't worry, this
                can be updated later!
              </p>
            </div>

            <div className="flex justify-center items-center gap-x-3 pt-3">
              <Button
                onClick={onClose}
                type="button"
                className="bg-fill-100 hover:bg-fill-200 duration-300 text-base-950"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-400 duration-300 text-neutral-50"
              >
                Create Client
              </Button>
            </div>
          </form>
        </Box>
      )}

      {onSuccess && (
        <OnSuccessModal
          onClose={onClose}
          header="A new client was created!"
          description="They will have 0 orders by default. Their details can be updated at a later time if you wish to do so!"
        />
      )}
    </div>
  );
}
