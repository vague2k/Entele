import axios from "axios";
import {
  useState,
  type ChangeEvent,
  type ReactEventHandler,
  type SyntheticEvent,
} from "react";
import toast from "react-hot-toast";
import type { IconType } from "react-icons";
import { BiX } from "react-icons/bi";
import Box from "./Box";
import Button from "./Button";
import Input from "./Input";

interface ModalProps {
  header: string;
  description: string;
  icon: IconType;
  visible: boolean;
  onClose: ReactEventHandler;
}

interface EditRecordModalProps extends ModalProps {
  clientName: string;
  clientEmail: string;
  clientOrderAmount: number;
}

export function ConfirmDeleteModal({
  visible,
  onClose,
  header,
  description,
  icon: Icon,
}: ModalProps) {
  if (!visible) return null;

  async function handleDeleteAllRecords() {
    try {
      const response = await axios.delete("/api/clients/deleteall", {
        headers: { "Content-Type": "application/json" },
      });

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

export function EditRecordModal({
  visible,
  onClose,
  header,
  icon: Icon,
  clientName,
  clientEmail,
  clientOrderAmount,
}: EditRecordModalProps) {
  if (!visible) return null;

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
            <Icon size={25} className="text-blue-500" />
          </div>
          <h1 className="font-semibold text-lg text-neutral-800">{header}</h1>
          <p className="flex flex-col pb-3 font-regular text-sm text-center text-neutral-500">
            <span>Client's Info</span>
            <span>{clientName}</span>
            <span>{clientEmail}</span>
          </p>

          <Input placeholder={`Name: ${clientName}`} />
          <Input placeholder={`Email: ${clientEmail}`} />
          <Input placeholder={`Total orders: ${clientOrderAmount}`} />
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

export function CreateClientModal({
  visible,
  onClose,
  header,
  icon: Icon,
}: ModalProps) {
  if (!visible) return null;

  const [clientFormData, setClientFormData] = useState({
    name: "",
    email: "",
    amountOfOrders: 0,
  });

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
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="flex flex-col justify-center gap-y-3 items-center">
            <Button
              onClick={onClose}
              type="button"
              className="absolute right-3 top-3 bg-transparent hover:bg-neutral-200 duration-300 text-neutral-800"
            >
              <BiX size={20} />
            </Button>
            <div className="flex justify-center items-center w-11 h-11 rounded-full bg-blue-200">
              <Icon size={25} className="text-blue-500" />
            </div>
            <h1 className="font-semibold text-lg text-neutral-800">{header}</h1>

            <p className="pb-3 font-regular text-sm text-center text-neutral-500">
              A red dot means this field is required
            </p>

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
            <Input
              onChange={onChange}
              name="amountOfOrders"
              value={clientFormData.amountOfOrders}
              placeholder="Amount of orders"
            />

            <p className="pb-3 font-regular text-sm text-center text-neutral-500">
              If no amount of orders was given, 0 orders will be assigned to the
              new client by default
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
    </div>
  );
}