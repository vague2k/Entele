import type { ReactEventHandler } from "react";
import { BiAlarmExclamation, BiCheck, BiX } from "react-icons/bi";
import Box from "../ui/Box";
import Button from "../ui/Button";

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
    <Box className="h-fit w-full rounded-xl max-w-lg p-7">
      <div className="relative items-center">
        <div className="block mr-auto">
          <h1 className="flex gap-x-2 font-medium text-lg text-left text-base-900">
            {header}
            <BiCheck size={25} className="text-green-600" />
          </h1>
          <p className="font-normal text-left text-sm w-[430px] text-base-500">
            {description}
          </p>
        </div>
        <Button
          onClick={onClose}
          type="button"
          className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100"
        >
          <BiX size={20} />
        </Button>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            type="button"
            className="bg-fill-100 hover:bg-fill-200 text-base-900 mt-6"
          >
            Dismiss
          </Button>
        </div>
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
    <Box className="h-fit w-full rounded-xl max-w-lg p-7">
      <div className="relative items-center">
        <div className="block mr-auto">
          <h1 className="flex gap-x-2 font-medium text-lg text-left text-base-900">
            {header}
            <BiAlarmExclamation size={25} className="text-yellow-500" />
          </h1>
          <p className="font-normal text-left text-sm w-[420px] text-base-500">
            {description}
          </p>
        </div>
        <Button
          onClick={onClose}
          type="button"
          className="absolute -right-5 -top-5 bg-transparent hover:bg-fill-100"
        >
          <BiX size={20} />
        </Button>
        <div className="flex justify-end gap-x-1">
          <Button
            onClick={onClose}
            type="button"
            className="bg-fill-100 hover:bg-fill-200 text-base-900 mt-6"
          >
            No, cancel
          </Button>
          <Button
            onClick={callback}
            type="button"
            className="bg-yellow-500 hover:bg-yellow-600 text-base-900 mt-6"
          >
            Yes, I'm sure
          </Button>
        </div>
      </div>
    </Box>
  );
}
