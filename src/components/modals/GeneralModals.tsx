import type { ReactEventHandler } from "react";
import { BiCheck, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";

interface GeneralModalProps {
  header: string;
  description?: string;
  onClose: ReactEventHandler;
}

export function OnSuccessModal({
  header,
  description,
  onClose,
}: GeneralModalProps) {
  return (
    <Box className="h-fit w-fit max-w-lg p-8">
      <div className="relative flex flex-col justify-center gap-y-3 items-center px-8">
        <div className="flex justify-center items-center w-11 h-11 rounded-full bg-green-500">
          <BiCheck size={25} className="text-neutral-50" />
        </div>
        <h1 className="font-semibold text-lg text-neutral-800">{header}</h1>
        <p className="font-regular text-sm text-center text-neutral-500">
          {description}
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
  );
}

export function OnErrorModal({
  header,
  description,
  onClose,
}: GeneralModalProps) {
  return (
    <Box className="h-fit w-fit max-w-lg p-8">
      <div className="relative flex flex-col justify-center gap-y-3 items-center px-8">
        <div className="flex justify-center items-center w-11 h-11 rounded-full bg-red-200">
          <BiX size={25} className="text-red-200" />
        </div>
        <h1 className="font-semibold text-lg text-neutral-800">{header}</h1>
        <p className="font-regular text-sm text-center text-neutral-500">
          {description}
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
  );
}
