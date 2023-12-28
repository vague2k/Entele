import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { BiChevronDown } from "react-icons/bi";
import "../globals.css";
import { ActionBarType, TableType } from "../types";
import type { ClientsRecord } from "../xata";
import ActionBar from "./ActionBar";
import Table from "./Table";
import CreateClientModal from "./modals/CreateClientModal";
import DeleteAllClientsModal from "./modals/DeleteAllClientsModal";
import EditRecordModal from "./modals/EditClientRecordModal";
import modalReducer from "./modals/modalReducer";
import Button from "./ui/Button";
import Input from "./ui/Input";

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
      <ActionBar
        type={ActionBarType.ClientsActionBar}
        createCallback={() => {
          dispatchModal({ type: "openCreateClient" });
        }}
        deleteCallback={() => {
          dispatchModal({ type: "openDeleteAll" });
        }}
      />

      <div className="flex items-center">
        <Input placeholder="Search" className="w-1/2 my-2" />
        <div className="flex ml-auto gap-x-2">
          <Button>Table View</Button>
          <Button className="px-4">
            <span className="flex items-center gap-x-1">
              Columns
              <BiChevronDown />
            </span>
          </Button>
        </div>
      </div>

      <Table
        type={TableType.ClientsTable}
        clientData={listOfClients}
        callback={onClientRecordClick}
      />

      {/* We call the dispatch function for the Modal's onClose prop 
      again here becuase dispatching toggles the boolean state */}
      <DeleteAllClientsModal
        onClose={() => dispatchModal({ type: "openDeleteAll" })}
        isOpen={modalState.isDeleteAllOpen as true}
        totalRecords={listOfClients.length}
        refreshIfDataChange={async () => {
          await fetchData();
        }}
      />

      <EditRecordModal
        onClose={() => dispatchModal({ type: "openEditRecord" })}
        isOpen={modalState.isEditRecordOpen as true}
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
        isOpen={modalState.isCreateClientOpen as true}
        refreshIfDataChange={async () => {
          await fetchData();
        }}
      />
    </div>
  );
}
