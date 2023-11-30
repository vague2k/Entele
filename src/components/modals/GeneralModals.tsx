import type { ReactEventHandler } from "react";
import { BiAlarmExclamation, BiCheck, BiX } from "react-icons/bi";
import Box from "../Box";
import Button from "../Button";

interface GeneralModalProps {
  header: string;
  description?: string;
  onClose: ReactEventHandler;
}

interface ConfirmActionModalProps extends GeneralModalProps {
  callback: ReactEventHandler;
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

export function ConfirmActionModal({
  header,
  description,
  onClose,
  callback,
}: ConfirmActionModalProps) {
  return (
    <Box className="relative h-fit w-fit max-w-lg p-8">
      <div className="flex flex-col justify-center gap-y-3 items-center">
        <Button
          onClick={onClose}
          type="button"
          className="absolute right-3 top-3 bg-transparent hover:bg-neutral-200 duration-300 text-neutral-800"
        >
          <BiX size={20} />
        </Button>
        <div className="flex justify-center items-center w-11 h-11 rounded-full bg-yellow-300">
          <BiAlarmExclamation size={25} className="text-yellow-600" />
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
          Cancel action
        </Button>
        <Button
          onClick={callback}
          type="button"
          className="bg-yellow-400 hover:bg-yellow-500 duration-300 text-neutral-800"
        >
          Yes, Continue
        </Button>
      </div>
    </Box>
  );
}
