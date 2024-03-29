import { useState } from "react";
import {
  BiCheckCircle,
  BiConfused,
  BiPackage,
  BiXCircle,
} from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { TableType, type VisibleTableColumn } from "../types";
import { formatDate } from "../utils";
import { TableColumnDropdownButton } from "./TableColumnDropdown";
import TableWrapper, { tableHeaders } from "./TableWrapper";
import Box from "./ui/Box";
import Button from "./ui/Button";
import Input from "./ui/Input";

interface TableProps {
  data: any[];
  callback?: (...args: any[]) => void;
  type: TableType;
}

export default function Table({ type, data, callback }: TableProps) {
  /* This state is an object, where the keys are the column names,
   * and values are booleans representing it's visiblity status.
   *
   * by default all columns are visible (set to true)
   */
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility: VisibleTableColumn = {};
    for (const header of tableHeaders[type]) {
      initialVisibility[header.name] = true;
    }

    return initialVisibility;
  });

  /* This function checks if each columns dbFieldName has a nested property or not
   *
   * I.E a nested prop in this case could be "xata.createdAt"
   */
  function getValueFromDataProperty(
    record: [], // really did not wanna bother with type checking this lmao
    dbFieldName: string,
  ) {
    // split any fields that have nested properties
    const fieldNames: string[] = dbFieldName.split(".");
    let value: any = record;

    for (const fieldName of fieldNames) {
      /* if the client's record has dbFieldName as a property
       * we set value with whatever the NEW value of value[<prop>] is
       */
      if (value && Object.prototype.hasOwnProperty.call(value, fieldName)) {
        value = value[fieldName];

        // if the column's dbFieldName is NOT a prop of our value, set the value to null
      } else {
        value = null;
        break;
      }
    }

    // We check for specific field names and we can render whatever want
    // like for example, we can render icons and such
    if (dbFieldName === "xata.createdAt" || dbFieldName === "xata.updatedAt") {
      value = formatDate(value as Date);
    }

    if (dbFieldName === "complete" && value === true) {
      value = (
        <span className="flex gap-x-1">
          <BiCheckCircle className="text-green-500" size={20} />
          Shipped
        </span>
      );
    }

    if (dbFieldName === "complete" && value === false) {
      value = (
        <span className="flex gap-x-1">
          <BiXCircle className="text-red-600" size={20} />
          Not Shipped
        </span>
      );
    }

    if (dbFieldName === "averageUnitPrice" || dbFieldName === "totalAmount") {
      value = <>$ {value}</>;
    }

    if (dbFieldName === "amountOfOrders") {
      value = (
        <span className="flex items-center gap-x-1">
          <BiPackage />
          {value}
        </span>
      );
    }

    return value;
  }

  return (
    <>
      <div className="flex items-center">
        <Input placeholder="Search" className="w-1/2 my-2" />
        <div className="flex ml-auto gap-x-2">
          <Button>Table View</Button>
          <TableColumnDropdownButton
            columnVisibility={columnVisibility}
            setColumnVisibility={setColumnVisibility}
            type={type}
          />
        </div>
      </div>
      <Box className="overflow-y-auto max-h-[81vh] bg-transparent border border-fill-200/50 shadow-md">
        {data.length > 0 ? (
          /* The columnVisibility state (remember, this state is an object {})
           * gets passed down as a prop.
           */
          <TableWrapper type={type} columnVisibility={columnVisibility}>
            {data.map((dataItem) => (
              <tr
                onClick={() => {
                  callback(...Object.values(dataItem));
                  // console.log(...Object.values(dataItem));
                }}
                onKeyDown={(event) => {
                  // Check if the Enter key is pressed
                  if (event.key === "Enter") {
                    callback(...Object.values(dataItem));
                  }
                }}
                className="border-b border-fill-200 py-2 hover:bg-fill-100 duration-300 cursor-pointer"
                role="button"
                tabIndex={0}
              >
                {/* Where the header of a specific column is true, meaning the header is rendered 
                        Render the cells of that column, and render it's values
                  */}
                {/* TODO: How can we get client info like name and email from the clients id
                          to render the clients name of who the order is attatched to.
                */}
                {/* TODO: Make callback REQUIRED once onOrderRecordClick function is coded */}
                {tableHeaders[type]
                  .filter((header) => columnVisibility[header.name])
                  .map((column) => (
                    <td
                      key={column.id}
                      className={twMerge("table-record", column.classname)}
                    >
                      {getValueFromDataProperty(dataItem, column.dbFieldName)}
                    </td>
                  ))}
              </tr>
            ))}
          </TableWrapper>
        ) : (
          <div className="mt-40 flex flex-col gap-y-3 items-center text-base-300">
            <BiConfused size={100} />
            <h1 className="font-semibold text-3xl">
              It looks like there's nothing to see!
            </h1>
            <h1 className="font-medium text-md">
              Try creating something using the create button above
            </h1>
          </div>
        )}
      </Box>
    </>
  );
}
