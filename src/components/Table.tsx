import { useState, type SetStateAction } from "react";
import { createPortal } from "react-dom";
import { BiCheck, BiChevronDown, BiConfused } from "react-icons/bi";
import { twMerge } from "tailwind-merge";
import { TableType } from "../types";
import { formatDate } from "../utils";
import type { ClientsRecord, OrdersRecord } from "../xata";
import TableWrapper, { tableHeaders } from "./TableWrapper";
import Box from "./ui/Box";
import Button from "./ui/Button";
import Input from "./ui/Input";
import { TableColumnDropdown } from "./TableColumnDropdown";

interface TableProps {
  clientData?: ClientsRecord[];
  ordersData?: OrdersRecord[];
  callback: (...args: any[]) => void;
  type: TableType;
}

type VisibleTableColumn = Record<string, boolean>;

export default function Table({
  clientData,
  ordersData,
  type,
  callback,
}: TableProps) {
  /* TODO: tableHeaders should be dynamic and not hard coded
   * NOTE: used hard coded tableHeaders.ClientsTable just to see if the implementation it works
   */

  /* This state is an object, where the keys are the column names,
   * and values are booleans representing it's visiblity status.
   *
   * by default all columns are visible (set to true)
   */
  const [columnVisibility, setColumnVisibility] = useState(() => {
    const initialVisibility: VisibleTableColumn = {};
    for (const header of tableHeaders.ClientsTable) {
      initialVisibility[header.name] = true;
    }

    return initialVisibility;
  });

  /* This function will be used in getValueFromClient
   * to apply the formateDate util function on
   */
  function isDateField(dbFieldName: string): boolean {
    return dbFieldName === "xata.createdAt" || dbFieldName === "xata.updatedAt";
  }

  /* This function checks if each columns dbFieldName has a nested property or not
   *
   * I.E a nested prop in this case could be "xata.createdAt"
   */

  function getValueFromClientData(
    clientRecord: any, // really did not wanna bother with type checking this lmao
    dbFieldName: string,
  ) {
    // split any fields that have nested properties
    const fieldNames: string[] = dbFieldName.split(".");
    let value = clientRecord;

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

    // Then, check if this value (dbFieldName) ("I.E. xata.createdAt") corresponds to a date
    if (value && isDateField(dbFieldName)) {
      value = formatDate(value as Date);
    }

    return value;
  }

  if (type === "ClientsTable" && clientData !== undefined) {
    return (
      <>
        <div className="flex items-center">
          <Input placeholder="Search" className="w-1/2 my-2" />
          <div className="flex ml-auto gap-x-2">
            <Button>Table View</Button>
            <TableColumnDropdown
              columnVisibility={columnVisibility}
              setColumnVisibility={setColumnVisibility}
              type={type}
            />
          </div>
        </div>
        <Box className="overflow-y-auto max-h-[81vh] bg-transparent border border-fill-200/50 shadow-md">
          {clientData.length <= 0 && (
            <div className="mt-40 flex flex-col gap-y-3 items-center text-base-300">
              <BiConfused size={100} />
              <h1 className="font-semibold text-3xl">
                It looks like you have no clients!
              </h1>
              <h1 className="font-medium text-md">
                Try creating one using the create client button above
              </h1>
            </div>
          )}

          {clientData.length > 0 && (
            /* The columnVisibility state (remember, this state is an object {})
             * gets passed down as a prop.
             */
            <TableWrapper type={type} columnVisibility={columnVisibility}>
              {clientData.map((client) => (
                <tr
                  key={client.id}
                  onClick={() =>
                    callback(
                      client.id,
                      client.name,
                      client.email,
                      client.amountOfOrders,
                    )
                  }
                  onKeyDown={(event) => {
                    // Check if the Enter key is pressed
                    if (event.key === "Enter") {
                      callback(
                        client.id,
                        client.name,
                        client.email,
                        client.amountOfOrders,
                      );
                    }
                  }}
                  className="border-b border-fill-200 py-2 hover:bg-fill-100 duration-300 cursor-pointer"
                  role="button"
                  tabIndex={0}
                >
                  {/* Where the header of a specific column is true, meaning the header is rendered 
                        Render the cells of that column, and render it's values
                  */}
                  {tableHeaders.ClientsTable.filter(
                    (header) => columnVisibility[header.name],
                  ).map((column) => (
                    <td
                      key={column.id}
                      className={twMerge("table-record", column.classname)}
                    >
                      {getValueFromClientData(client, column.dbFieldName)}
                    </td>
                  ))}
                </tr>
              ))}
            </TableWrapper>
          )}
        </Box>
      </>
    );
  }
  {
    /*
  if (type === "OrdersTable" && ordersData !== undefined) {
    return (
      <Box className="overflow-y-auto max-h-[80vh] bg-transparent border border-fill-200/50 shadow-md">
        {ordersData.length <= 0 && (
          <div className="mt-40 flex flex-col gap-y-3 items-center text-base-300">
            <BiConfused size={100} />
            <h1 className="font-semibold text-3xl">
              It looks like you have no one has any orders!
            </h1>
            <h1 className="font-medium text-md">
              Try creating one using the create order button above
            </h1>
          </div>
        )}

        {ordersData.length > 0 && (
          <TableWrapper type={type}>
            {ordersData.map((order, index) => (
              <tr
                key={order.id}
                onClick={() =>
                  callback(
                    order.id,
                    order.client?.id,
                    order.client?.name,
                    order.totalUnits,
                    order.complete,
                    order.totalAmount,
                    order.averageUnitPrice,
                  )
                }
                onKeyDown={(event) => {
                  // Check if the Enter key is pressed
                  if (event.key === "Enter") {
                    callback(
                      order.id,
                      order.client?.id,
                      order.client?.name,
                      order.totalUnits,
                      order.complete,
                      order.totalAmount,
                      order.averageUnitPrice,
                    );
                  }
                }}
                className="border-b border-fill-200 py-2 hover:bg-fill-100 duration-300 cursor-pointer"
                role="button"
                tabIndex={0}
              >
                <td id="name" className="table-record">
                  {index + 1}
                </td>
                <td className="table-record">{order.client?.name}</td>
                <td className="table-record">{order.totalUnits}</td>
                <td className="table-record">{order.complete}</td>
                <td className="table-record">{order.totalAmount}</td>
                <td className="table-record">{order.averageUnitPrice}</td>
                <td className="table-record">
                  {formatDate(order.xata.createdAt)}
                </td>
                <td className="table-record">
                  {formatDate(order.xata.updatedAt)}
                </td>
              </tr>
            ))}
          </TableWrapper>
        )}
      </Box>
    );
  }
*/
  }
}
