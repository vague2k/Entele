import { BiRefresh, BiTrash, BiUserPlus } from "react-icons/bi";
import { ActionBarType } from "../types";
import Box from "./Box";
import Button from "./Button";

interface ActionBarProps {
  type: ActionBarType;
}

interface ClientActionBarProps extends ActionBarProps {
  createCallback: () => void;
  deleteCallback: () => void;
}

export default function ActionBar({
  type,
  createCallback,
  deleteCallback,
}: ClientActionBarProps) {
  if (type === ActionBarType.ClientsActionBar) {
    return (
      <div className="flex pb-4 justify-center items-center">
        <Box className="flex flex-row gap-x-3 h-fit">
          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="p-3"
          >
            <BiRefresh size={20} />
          </Button>
          <Button onClick={createCallback}>
            <BiUserPlus size={20} />
            Create Client
          </Button>
          <Button onClick={deleteCallback}>
            <BiTrash size={20} />
            Delete All
          </Button>
        </Box>
      </div>
    );
  }
}
