import axios from "axios";
import { useState, type ChangeEvent, type SyntheticEvent } from "react";
import toast from "react-hot-toast";
import { BiCheck, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";
import Input from "../Input";
import type { ModalProps } from "./types";

export default function CreateClientModal({
  visible,
  onClose,
  header,
  icon: Icon,
  refreshIfDataChange,
}: ModalProps & { refreshIfDataChange: () => void }) {
  if (!visible) return null;

  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
  });
  const [wasDataCreated, setWasDataCreated] = useState(false);

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setClientFormData({ ...clientFormData, [name]: value });
  }

  async function handleSubmit(event: SyntheticEvent) {
    event.preventDefault();

    try {
      const response = await axios.post("/api/clients/create", clientFormData, {
        headers: { "Content-Type": "application/json" },
      });

      setWasDataCreated(true);
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
      {!wasDataCreated && (
        <Box className="relative h-fit w-fit max-w-lg p-8">
          <form onSubmit={(event) => handleSubmit(event)}>
            <div className="relative flex flex-col justify-center gap-y-3 items-center">
              <Button
                onClick={onClose}
                type="button"
                className="absolute -right-5 -top-5 bg-transparent hover:bg-neutral-200 duration-300 text-neutral-800"
              >
                <BiX size={20} />
              </Button>
              <div className="flex justify-center items-center w-11 h-11 rounded-full bg-blue-200">
                <Icon size={25} className="text-blue-500" />
              </div>
              <h1 className="font-semibold text-lg text-neutral-800">
                {header}
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

              <p className="pb-3 font-regular text-sm text-center text-neutral-500">
                The new client will have 0 orders by default. Don't worry, this
                can be updated later!
              </p>
            </div>

            <div className="flex justify-center items-center gap-x-3 pt-3">
              <Button
                onClick={onClose}
                type="button"
                className="bg-neutral-200 hover:bg-neutral-300 duration-300 text-neutral-800"
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="bg-blue-500 hover:bg-blue-400 duration-300 text-neutral-50"
              >
                Create Client
              </Button>
            </div>
          </form>
        </Box>
      )}

      {wasDataCreated && (
        <Box className="h-fit w-fit max-w-lg p-8">
          <div className="relative flex flex-col justify-center gap-y-3 items-center px-8">
            <div className="flex justify-center items-center w-11 h-11 rounded-full bg-green-500">
              <BiCheck size={25} className="text-neutral-50" />
            </div>
            <h1 className="font-semibold text-lg text-neutral-800">
              A new client was created!
            </h1>
            <p className="font-regular text-sm text-center text-neutral-500">
              They will have 0 orders by default. They're details can be updated
              later if you wish to do so!
            </p>
            <Button
              onClick={onClose}
              type="button"
              className="absolute -right-5 -top-5 bg-transparent hover:bg-neutral-200 duration-300 text-neutral-800"
            >
              <BiX size={20} />
            </Button>
            <Button
              onClick={onClose}
              type="button"
              className="bg-neutral-200 hover:bg-neutral-300 duration-300 text-neutral-800"
            >
              Dismiss
            </Button>
          </div>
        </Box>
      )}
    </div>
  );
}
