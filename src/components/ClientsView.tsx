import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import "../globals.css";
import { ActionBarType, TableType } from "../types";
import type { ClientsRecord } from "../xata";
import ActionBar from "./ActionBar";
import Input from "./Input";
import Table from "./Table";
import CreateClientModal from "./modals/CreateClientModal";
import DeleteAllClientsModal from "./modals/DeleteAllClientsModal";
import EditRecordModal from "./modals/EditClientRecordModal";
import modalReducer from "./modals/modalReducer";

export default function ClientsView() {
  const [animationParent] = useAutoAnimate();
  const [listOfClients, setListOfClients] = useState<ClientsRecord[]>([]);
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
      const data: ClientsRecord[] = await response.data;
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

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-[17px]" ref={animationParent}>
      <div className="flex pb-4 gap-x-3 justify-center items-center">
        <h1 className="text-base-950 font-semibold text-2xl whitespace-nowrap">
          All your clients in one place!
        </h1>
        <Input placeholder="Search" />
      </div>

      <ActionBar
        type={ActionBarType.ClientsActionBar}
        createCallback={() => {
          dispatchModal({ type: "openCreateClient" });
        }}
        deleteCallback={() => {
          dispatchModal({ type: "openDeleteAll" });
        }}
      />

      <Table
        type={TableType.ClientsTable}
        clientData={listOfClients}
        callback={onClientRecordClick}
      />

      {/* We call the dispatch function for the Modal's onClose prop 
      again here becuase dispatching toggles the boolean state */}
      <DeleteAllClientsModal
        onClose={() => dispatchModal({ type: "openDeleteAll" })}
        isOpen={modalState.isDeleteAllOpen}
        totalRecords={listOfClients.length}
        refreshIfDataChange={async () => {
          await fetchData();
        }}
      />

      <EditRecordModal
        onClose={() => dispatchModal({ type: "openEditRecord" })}
        isOpen={modalState.isEditRecordOpen}
        currentClient={{
          id: clientInfo.id,
          name: clientInfo.name,
          email: clientInfo.email,
          amountOfOrders: clientInfo.amountOfOrders,
        }}
        refreshIfDataChange={async () => {
          await fetchData();
        }}
      />

      <CreateClientModal
        onClose={() => dispatchModal({ type: "openCreateClient" })}
        isOpen={modalState.isCreateClientOpen}
        refreshIfDataChange={async () => {
          await fetchData();
        }}
      />
    </div>
  );
}
