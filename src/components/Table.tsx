import { BiConfused } from "react-icons/bi";
import { TableType } from "../types";
import { formatDate } from "../utils";
import type { ClientsRecord, OrdersRecord } from "../xata";
import Box from "./Box";
import TableWrapper from "./TableWrapper";

interface TableProps {
  clientData?: ClientsRecord[];
  ordersData?: OrdersRecord[];
  callback: (...args) => void;
  type: TableType;
}

export default function Table({ clientData, type, callback }: TableProps) {
  if (type === "ClientsTable" && clientData !== undefined) {
    return (
      <Box className="overflow-y-auto max-h-[76vh]">
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
          <TableWrapper type={type}>
            {clientData.map((client, index) => (
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
                <td className="table-record">{index + 1}</td>
                <td className="table-record">{client.name}</td>
                <td className="table-record">{client.email}</td>
                <td className="table-record">{client.amountOfOrders}</td>
                <td className="table-record">
                  {formatDate(client.xata.createdAt)}
                </td>
                <td className="table-record">
                  {formatDate(client.xata.updatedAt)}
                </td>
              </tr>
            ))}
          </TableWrapper>
        )}
      </Box>
    );
  }
}
