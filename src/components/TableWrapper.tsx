import { twMerge } from "tailwind-merge";
import { TableType } from "../types";

const tableHeaders = {
  [TableType.ClientsTable]: [
    { id: 1, name: "clientID", classname: "w-[110px]" },
    { id: 2, name: "Name", classname: "" },
    { id: 3, name: "Email", classname: "" },
    { id: 4, name: "Orders", classname: "" },
    { id: 5, name: "Created At", classname: "" },
    { id: 6, name: "Last Updated", classname: "" },
  ],

  // TODO: Remember to update this when orders table is being worked on
  [TableType.OrdersTable]: [
    { id: 1, name: "Name", classname: "" },
    { id: 2, name: "Total Units", classname: "" },
    { id: 3, name: "Completed Order", classname: "" },
    { id: 4, name: "Created At", classname: "" },
    { id: 5, name: "Total", classname: "" },
    { id: 6, name: "Average Price", classname: "" },
    { id: 7, name: "Last Updated", classname: "" },
  ],
};

interface TableWrapperProps {
  type: TableType;
  children: React.ReactNode;
}

export default function TableWrapper({ type, children }: TableWrapperProps) {
  return (
    <div className="flex flex-col">
      <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
        <div className="inline-block min-w-full">
          <div className="overflow-hidden">
            <table className="w-full">
              <thead className="border-b border-fill-200">
                {tableHeaders[type].map(({ id, name, classname }) => (
                  <th key={id} className={twMerge("table-header ", classname)}>
                    {name}
                  </th>
                ))}
              </thead>
              <tbody>{children}</tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
