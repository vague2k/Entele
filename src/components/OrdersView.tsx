import { useAutoAnimate } from "@formkit/auto-animate/react";
import { useReducer } from "react";
import { ActionBarType } from "../types";
import ActionBar from "./ActionBar";
import CreateOrderModal from "./modals/CreateOrderModal";
import modalReducer from "./modals/modalReducer";
import Input from "./ui/Input";

export default function OrdersView() {
  const [animationParent] = useAutoAnimate();
  const [modalState, dispatchModal] = useReducer(modalReducer, {
    isCreateOrderOpen: false,
  });
  return (
    <div className="p-[17px]" ref={animationParent}>
      <div className="flex pb-4 gap-x-3 justify-center items-center">
        <h1 className="text-base-950 font-semibold text-2xl whitespace-nowrap">
          All your Orders!
        </h1>
        <Input placeholder="Search" />
      </div>

      <ActionBar
        type={ActionBarType.OrdersActionBar}
        createCallback={() => {
          dispatchModal({ type: "openCreateOrder" });
        }}
      />

      <CreateOrderModal
        onClose={() => dispatchModal({ type: "openCreateOrder" })}
        isOpen={modalState.isCreateOrderOpen}
      />
    </div>
  );
}
