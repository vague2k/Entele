import { TableType } from "../types";

const tableHeaders = {
  [TableType.ClientsTable]: [
    { id: 1, name: "Name" },
    { id: 2, name: "Email" },
    { id: 3, name: "# of Orders" },
    { id: 4, name: "Created At" },
    { id: 5, name: "Last Updated" },
  ],

  // TODO: Remember to update this when orders table is being worked on
  [TableType.OrdersTable]: [
    { id: 1, name: "Name" },
    { id: 2, name: "Total Units" },
    { id: 3, name: "Completed Order" },
    { id: 4, name: "Created At" },
    { id: 5, name: "Total" },
    { id: 6, name: "Average Price" },
    { id: 7, name: "Last Updated" },
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
            <table className="min-w-full">
              <thead className="border-b border-fill-200">
                {tableHeaders[type].map(({ id, name }) => (
                  <th key={id} className="table-header">
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
