import axios from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { BiX } from "react-icons/bi";
import type { ModalProps } from "../../types";
import Box from "../ui/Box";
import Button from "../ui/Button";
import Input from "../ui/Input";
import { OnSuccessModal } from "./GeneralModals";

export default function CreateClientModal({
  isOpen,
  onClose,
  refreshIfDataChange,
}: ModalProps) {
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
        <Box className="relative h-fit w-full rounded-xl max-w-[500px] p-7">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="relative items-center">
              <Button
                onClick={onClose}
                type="button"
                className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
              >
                <BiX size={20} />
              </Button>

              <div className="mr-auto">
                <h1 className="font-medium text-lg text-base-900">
                  Create Client
                </h1>
                <p className="font-regular text-sm text-left w-96 text-base-500">
                  The new client will have 0 orders by default. Don't worry,
                  this can be updated later!
                </p>
              </div>

              <div className="pt-6">
                <label
                  htmlFor="name"
                  className="text-sm ml-1 mb-1 mr-auto text-base-900"
                >
                  Name
                </label>
                <Input
                  id="name"
                  onChange={onChange}
                  name="name"
                  value={clientFormData.name}
                  placeholder="Name"
                  className="mb-2"
                />

                <label
                  htmlFor="email"
                  className="text-sm ml-1 mr-auto text-base-900"
                >
                  Email
                </label>
                <Input
                  id="email"
                  onChange={onChange}
                  name="email"
                  value={clientFormData.email}
                  placeholder="Email"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-x-1 pt-8">
              <Button onClick={onClose} type="button">
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-primary-500 hover:bg-primary-400 text-neutral-50"
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
