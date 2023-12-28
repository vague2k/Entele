import { BiConfused, BiPackage } from "react-icons/bi";
import { TableType } from "../types";
import { formatDate } from "../utils";
import type { ClientsRecord, OrdersRecord } from "../xata";
import TableWrapper from "./TableWrapper";
import Box from "./ui/Box";

interface TableProps {
  clientData?: ClientsRecord[];
  ordersData?: OrdersRecord[];
  callback: (...args) => void;
  type: TableType;
}

export default function Table({
  clientData,
  ordersData,
  type,
  callback,
}: TableProps) {
  if (type === "ClientsTable" && clientData !== undefined) {
    return (
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
                <td className="table-record w-[110px] block truncate">
                  {client.id}
                </td>
                <td className="table-record">{client.name}</td>
                <td className="table-record">{client.email}</td>
                <td className="table-record flex items-center gap-x-1">
                  <BiPackage />
                  {client.amountOfOrders}
                </td>
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
                <td className="table-record">{index + 1}</td>
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
}
