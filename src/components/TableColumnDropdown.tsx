import { type SetStateAction, useState } from "react";
import { createPortal } from "react-dom";
import { BiCheck, BiChevronDown } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import type { TableType, VisibleTableColumn } from "../types";
import { tableHeaders } from "./TableWrapper";
import Box from "./ui/Box";
import Button from "./ui/Button";

interface TableColumnDropdownProps {
  columnVisibility: VisibleTableColumn;
  setColumnVisibility: React.Dispatch<SetStateAction<VisibleTableColumn>>;
  type: TableType;
}

export function TableColumnDropdownButton({
  columnVisibility,
  setColumnVisibility,
  type,
}: TableColumnDropdownProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const injectMenuIntoOverlayDiv = document.getElementById("overlay");

  if (injectMenuIntoOverlayDiv === null) {
    throw new Error('Could not find document by Id "overlay"');
  }

  return (
    <>
      <Button onClick={() => setIsExpanded(!isExpanded)}>
        Columns
        <BiChevronDown />
      </Button>
      {isExpanded &&
        createPortal(
          <TableColumnDropdownMenu
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            type={type}
          />,
          injectMenuIntoOverlayDiv,
        )}
    </>
  );
}

export function TableColumnDropdownMenu({
  columnVisibility,
  setColumnVisibility,
  type,
}: TableColumnDropdownProps) {
  const toggleColumnVisibility = (columnName: string) => {
    setColumnVisibility((prevVisibility: VisibleTableColumn) => ({
      ...prevVisibility,
      [columnName]: !prevVisibility[columnName],
    }));
  };

  return (
    <Box className="absolute shadow-md top-28 z-10 right-4 h-fit w-[150px] p-1 border border-fill-200/50">
      {tableHeaders[type].map((item) => (
        <Button
          key={item.id}
          className="flex w-full rounded-md py-0 bg-transparent justify-start hover:bg-fill-100"
          onClick={() => toggleColumnVisibility(item.name)}
        >
          <BiCheck
            className={twMerge(
              "mr-1 text-base-900",
              columnVisibility[item.name]
                ? "text-opacity-100"
                : "text-opacity-0",
            )}
          />
          {item.name}
        </Button>
      ))}
    </Box>
  );
}
