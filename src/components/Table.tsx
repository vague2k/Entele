import { TableType } from "../types";
import { formatDate } from "../utils";
import type { ClientsRecord, OrdersRecord } from "../xata";
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
    );
  }
}
