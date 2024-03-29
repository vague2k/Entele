import { useStore } from "@nanostores/react";
import { useEffect, useReducer, useState } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import "../globals.css";
import { $clientsStore, getClients } from "../stores/clients";
import { $isLoading } from "../stores/loading";
import { ActionBarType, TableType } from "../types";
import ActionBar from "./ActionBar";
import Table from "./Table";
import CreateClientModal from "./modals/CreateClientModal";
import DeleteAllClientsModal from "./modals/DeleteAllClientsModal";
import EditRecordModal from "./modals/EditClientRecordModal";
import modalReducer from "./modals/modalReducer";
import Box from "./ui/Box";

export default function ClientsView() {
  const $clients = useStore($clientsStore);
  const $loading = useStore($isLoading);
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

  /* NOTE: The params for onClientRecordClick are in alphabetical order
   *       since this is the same order that the dataItem object from the data prop in Table
   *       is spread.
   * */
  function onClientRecordClick(
    amountOfOrders: number,
    email: string,
    id: string,
    name: string,
  ) {
    dispatchModal({ type: "openEditRecord" });
    setClientInfo({ id, name, email, amountOfOrders });
  }

  useEffect(() => {
    getClients();
  }, []);

  return (
    <div className="p-[17px]">
      <ActionBar
        type={ActionBarType.ClientsActionBar}
        createCallback={() => {
          dispatchModal({ type: "openCreateClient" });
        }}
        deleteCallback={() => {
          dispatchModal({ type: "openDeleteAll" });
        }}
      />

      {$loading ? (
        <Box className="h-[82vh] mt-12 bg-transparent border border-fill-200/50 shadow-md">
          <div className="mt-56 flex font-semibold text-2xl flex-col gap-y-3 items-center text-base-300">
            <BiLoaderAlt className="animate-spin" size={100} />
            Loading...
          </div>
        </Box>
      ) : (
        <Table
          type={TableType.ClientsTable}
          data={$clients}
          callback={onClientRecordClick}
        />
      )}

      {/* We call the dispatch function for the Modal's onClose prop 
      again here becuase dispatching toggles the boolean state */}
      <DeleteAllClientsModal
        onClose={() => dispatchModal({ type: "openDeleteAll" })}
        isOpen={modalState.isDeleteAllOpen as true}
        totalRecords={$clients.length}
        refreshIfDataChange={() => {
          getClients();
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
        refreshIfDataChange={() => {
          getClients();
        }}
      />

      <CreateClientModal
        onClose={() => dispatchModal({ type: "openCreateClient" })}
        isOpen={modalState.isCreateClientOpen as true}
        refreshIfDataChange={() => {
          getClients();
        }}
      />
    </div>
  );
}
