import { useState, type ChangeEvent } from "react";
import { BiX } from "react-icons/bi";
import type { ModalProps } from "../../types";
import Box from "../ui/Box";
import Button from "../ui/Button";
import Input from "../ui/Input";

export default function CreateOrderModal({ isOpen, onClose }: ModalProps) {
  const [form, setForm] = useState({
    clientName: "",
    clientEmail: "",
    units: 0,
    unitPrice: 0,
    garmentType: "",
    garmentBrand: "",
    garmentCode: "",
    garmentColor: "",
  });

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    const isNumericValue =
      value !== "" &&
      (name === "units" || name === "unitPrice") &&
      Number.isNaN(value)
        ? parseInt(value, 10)
        : value;
    setForm({ ...form, [name]: isNumericValue });
  }

  if (!isOpen) return null;

  return (
    <div className="flex items-center justify-center fixed inset-0 bg-fill-400 bg-opacity-30 backdrop-blur-sm">
      <Box className="relative h-fit w-fit max-w-5xl p-8">
        <form>
          <Button
            onClick={onClose}
            type="button"
            className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100 duration-300 text-base-950"
          >
            <BiX size={20} />
          </Button>
          <h1 className="font-bold text-2xl">Create an order!</h1>
          <p className="font-normal text-sm text-base-400">
            Fill out the field to create specific details, once your done
            reviewing all your details, submit the order!
          </p>
          <div className="grid-cols-2 grid-rows-2">
            <Input
              onChange={onChange}
              value={form.clientName}
              name="clientName"
              placeholder="Client name"
            />
            <Input
              onChange={onChange}
              value={form.clientEmail}
              name="clientEmail"
              placeholder="Client Email"
            />
            <Input
              onChange={onChange}
              value={form.garmentType}
              name="garmentType"
              placeholder="Type of Garment?"
            />
            <Input
              onChange={onChange}
              value={form.garmentBrand}
              name="garmentBrand"
              placeholder="Garment Brand?"
            />
            <Input
              onChange={onChange}
              value={form.garmentCode}
              name="garmentCode"
              placeholder="Garment Code?"
            />
            <Input
              onChange={onChange}
              value={form.garmentColor}
              name="garmentColor"
              placeholder="Garment Color?"
            />
            <Input
              onChange={onChange}
              value={form.units}
              name="units"
              placeholder="How many units?"
            />
            <Input
              onChange={onChange}
              value={form.unitPrice}
              name="unitPrice"
              placeholder="Unit Price?"
            />
          </div>
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
            Create Order Detail
          </Button>
          <Button
            type="submit"
            className="bg-primary-500 hover:bg-primary-400 duration-300 text-neutral-50"
          >
            Submit Order
          </Button>
        </form>
      </Box>
    </div>
  );
}
