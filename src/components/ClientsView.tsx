import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { BiConfused, BiRefresh, BiTrash, BiUserPlus } from "react-icons/bi";
import "../globals.css";
import { formatDate } from "../utils/formatDate";
import type { Clients } from "../xata";
import Box from "./Box";
import Button from "./Button";
import Input from "./Input";
import CreateClientModal from "./modals/CreateClientModal";
import DeleteAllClientsModal from "./modals/DeleteAllClientsModal";
import EditRecordModal from "./modals/EditClientRecordModal";
import modalReducer from "./modals/modalReducer";

interface ClientsResponse extends Clients {
  xata: {
    createdAt: string;
    updatedAt: string;
  };
}

export default function ClientsView() {
  const [listOfClients, setListOfClients] = useState<ClientsResponse[]>([]);
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    isCreateClientOpen: false,
    isDeleteAllOpen: false,
    isEditRecordOpen: false,
  });
  const [clientInfo, setClientInfo] = useState({
    id: "",
    name: "",
    email: "",
    amountOfOrders: 0,
  });

  function onClientRecordClick(
    id: string,
    name: string,
    email: string,
    amountOfOrders: number,
  ) {
    dispatchModal({ type: "openEditRecord" });
    setClientInfo({ id, name, email, amountOfOrders });
  }

  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:4321/api/clients/all");
      const data: ClientsResponse[] = await response.data;
      setListOfClients(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "An unknown error has occured, and has been automatically logged. Please try this action again later",
        );
      }
    }
  }

  async function refreshIfDataChanged() {
    await fetchData();
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-[17px]">
      <div className="flex pb-4 gap-x-3 justify-center items-center">
        <h1 className="text-base-950 font-semibold text-2xl whitespace-nowrap">
          All your clients in one place!
        </h1>
        <Input placeholder="Search" />
      </div>
      <div className="flex pb-4 justify-center items-center">
        <Box className="flex flex-row gap-x-3 h-fit">
          <Button
            type="button"
            onClick={() => window.location.reload()}
            className="p-3"
          >
            <BiRefresh size={20} />
          </Button>
          <Button onClick={() => dispatchModal({ type: "openCreateClient" })}>
            <BiUserPlus size={20} />
            Create Client
          </Button>
          <Button onClick={() => dispatchModal({ type: "openDeleteAll" })}>
            <BiTrash size={20} />
            Delete All
          </Button>
        </Box>
      </div>

      <Box className="overflow-y-auto max-h-[76vh]">
        {listOfClients.length <= 0 && (
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

        {listOfClients.length > 0 && (
          <div className="flex flex-col">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <div className="inline-block min-w-full">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead className="border-b border-fill-200">
                      <tr>
                        <th scope="col" className="table-header">
                          #
                        </th>
                        <th scope="col" className="table-header">
                          Name
                        </th>
                        <th scope="col" className="table-header">
                          Email
                        </th>
                        <th scope="col" className="table-header">
                          # of Orders
                        </th>
                        <th scope="col" className="table-header">
                          Created At
                        </th>
                        <th scope="col" className="table-header">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {listOfClients.map((client, index) => (
                        <tr
                          key={client.id}
                          onClick={() =>
                            onClientRecordClick(
                              client.id,
                              client.name,
                              client.email,
                              client.amountOfOrders,
                            )
                          }
                          onKeyDown={(event) => {
                            // Check if the Enter key is pressed
                            if (event.key === "Enter") {
                              onClientRecordClick(
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
                          <td className="table-record">
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
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        )}
      </Box>

      <DeleteAllClientsModal
        onClose={() => dispatchModal({ type: "openDeleteAll" })}
        isOpen={modalState.isDeleteAllOpen}
        totalRecords={listOfClients.length}
        refreshIfDataChange={refreshIfDataChanged}
      />

      <EditRecordModal
        onClose={() => dispatchModal({ type: "openEditRecord" })}
        isOpen={modalState.isEditRecordOpen}
        clientInfo={[
          clientInfo.id,
          clientInfo.name,
          clientInfo.email,
          clientInfo.amountOfOrders,
        ]}
        refreshIfDataChange={refreshIfDataChanged}
      />

      <CreateClientModal
        onClose={() => dispatchModal({ type: "openCreateClient" })}
        isOpen={modalState.isCreateClientOpen}
        refreshIfDataChange={refreshIfDataChanged}
      />
    </div>
  );
}
