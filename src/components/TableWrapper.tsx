import React from "react";
import { twMerge } from "tailwind-merge";
import { TableType } from "../types";

export const tableHeaders = {
  [TableType.ClientsTable]: [
    {
      id: 1,
      name: "clientID",
      dbFieldName: "id",
      classname: "w-[110px] block truncate-left",
    },
    { id: 2, name: "Name", dbFieldName: "name", classname: "" },
    { id: 3, name: "Email", dbFieldName: "email", classname: "" },
    { id: 4, name: "Orders", dbFieldName: "amountOfOrders", classname: "" },
    { id: 5, name: "Created At", dbFieldName: "xata.createdAt", classname: "" },
    {
      id: 6,
      name: "Last Updated",
      dbFieldName: "xata.updatedAt",
      classname: "",
    },
  ],

  [TableType.OrdersTable]: [
    {
      id: 1,
      name: "OrderID",
      dbFieldName: "id",
      classname: "w-[110px] block truncate-left",
    },
    { id: 2, name: "ClientID", dbFieldName: "clients.id", classname: "" },
    { id: 3, name: "Total Units", dbFieldName: "totalUnits", classname: "" },
    { id: 4, name: "Completed", dbFieldName: "complete", classname: "" },
    { id: 5, name: "Total", dbFieldName: "totalAmount", classname: "" },
    {
      id: 6,
      name: "Avg. Price",
      dbFieldName: "averageUnitPrice",
      classname: "",
    },
    { id: 7, name: "Created At", dbFieldName: "xata.createdAt", classname: "" },
    {
      id: 8,
      name: "Last Updated",
      dbFieldName: "xata.updatedAt",
      classname: "",
    },
  ],
};

interface TableWrapperProps {
  type: TableType;
  children: React.ReactNode;
  columnVisibility: { [key: string]: boolean };
}

export default function TableWrapper({
  type,
  children,
  columnVisibility,
}: TableWrapperProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-fill-200">
                {/* We only render the filtered tableHeaders that are set to true
                    ---
                    by default all are set to true 
                */}
                {tableHeaders[type]
                  .filter((header) => columnVisibility[header.name])
                  .map(({ id, name, classname }) => (
                    <th
                      key={id}
                      className={twMerge("table-header ", classname)}
                    >
                      {name}
                    </th>
                  ))}
              </thead>
              <tbody>
                {/* We map over the children (table rows) and clones each child element 
                    with an additional prop (columnVisibility).
                    ---
                    The purpose of passing down columnVisibility to each row 
                    is to ensure that the row can also consider column visibility 
                    when rendering its cells (<td> elements). 
                */}
                {React.Children.map(children, (child) =>
                  React.cloneElement(child as React.ReactElement, {
                    columnVisibility,
                  }),
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
