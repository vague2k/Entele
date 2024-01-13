import { useAutoAnimate } from "@formkit/auto-animate/react";
import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import toast from "react-hot-toast";
import { BiLoaderAlt } from "react-icons/bi";
import { ActionBarType, TableType } from "../types";
import type { OrdersRecord } from "../xata";
import ActionBar from "./ActionBar";
import Table from "./Table";
import CreateOrderModal from "./modals/CreateOrderModal";
import modalReducer from "./modals/modalReducer";
import Box from "./ui/Box";

export default function OrdersView() {
  const [animationParent] = useAutoAnimate();
  const [listOfOrders, setListOfOrders] = useState<OrdersRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    isCreateOrderOpen: false,
  });
  async function fetchData() {
    try {
      const response = await axios.get("http://localhost:4321/api/orders/all");
      const data: OrdersRecord[] = await response.data;
      setListOfOrders(data);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data.message);
      } else {
        toast.error(
          "An unknown error has occured, and has been automatically logged. Please try this action again later",
        );
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="p-[17px]" ref={animationParent}>
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
      {loading ? (
        <Box className="h-[82vh] mt-12 bg-transparent border border-fill-200/50 shadow-md">
          <div className="mt-56 flex font-semibold text-2xl flex-col gap-y-3 items-center text-base-300">
            <BiLoaderAlt className="animate-spin" size={100} />
            Loading...
          </div>
        </Box>
      ) : (
        <Table type={TableType.OrdersTable} data={listOfOrders} />
      )}

      <CreateOrderModal
        onClose={() => dispatchModal({ type: "openCreateOrder" })}
        isOpen={modalState.isCreateOrderOpen as true}
        refreshIfDataChange={async () => await fetchData()}
      />
    </div>
  );
}
