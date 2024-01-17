import { useStore } from "@nanostores/react";
import { useEffect, useReducer } from "react";
import { BiLoaderAlt } from "react-icons/bi";
import { $isLoading } from "../stores/loading";
import { $ordersStore, getOrders } from "../stores/orders";
import { ActionBarType, TableType } from "../types";
import ActionBar from "./ActionBar";
import Table from "./Table";
import CreateOrderModal from "./modals/CreateOrderModal";
import modalReducer from "./modals/modalReducer";
import Box from "./ui/Box";

export default function OrdersView() {
  const $orders = useStore($ordersStore);
  const $loading = useStore($isLoading);
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    isCreateOrderOpen: false,
  });

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <div className="p-[17px]">
      <ActionBar
        type={ActionBarType.OrdersActionBar}
        createCallback={() => {
          dispatchModal({ type: "openCreateOrder" });
        }}
      />

      {/* TODO: How can we get client info like name and email from the clients id?
                      to render the clients name of who the order is attatched to
            */}
      {/* TODO: Create EditOrderRecordModal */}

      {/* TODO:  */}
      {$loading ? (
        <Box className="h-[82vh] mt-12 bg-transparent border border-fill-200/50 shadow-md">
          <div className="mt-56 flex font-semibold text-2xl flex-col gap-y-3 items-center text-base-300">
            <BiLoaderAlt className="animate-spin" size={100} />
            Loading...
          </div>
        </Box>
      ) : (
        <Table type={TableType.OrdersTable} data={$orders} />
      )}

      <CreateOrderModal
        onClose={() => dispatchModal({ type: "openCreateOrder" })}
        isOpen={modalState.isCreateOrderOpen as true}
        refreshIfDataChange={() => getOrders()}
      />
    </div>
  );
}
