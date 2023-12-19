// Generated by Xata Codegen 0.26.9. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "clients",
    columns: [
      { name: "amountOfOrders", type: "int", notNull: true, defaultValue: "0" },
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "No name given",
      },
      {
        name: "email",
        type: "email",
        notNull: true,
        defaultValue: "no@email.given",
      },
    ],
  },
  {
    name: "orders",
    columns: [
      { name: "totalAmount", type: "float" },
      { name: "averageUnitPrice", type: "float" },
      { name: "totalUnits", type: "int" },
      { name: "orderDate", type: "string" },
      { name: "complete", type: "bool", defaultValue: "false" },
    ],
  },
  {
    name: "order_details",
    columns: [
      { name: "units", type: "int" },
      { name: "garmentType", type: "string" },
      { name: "garmentBrand", type: "string" },
      { name: "garmentCode", type: "string" },
      { name: "garmentColor", type: "string" },
      { name: "unitPrice", type: "float" },
      { name: "subtotal", type: "float" },
      { name: "clientName", type: "string" },
      { name: "clientEmail", type: "string" },
      { name: "clientId", type: "string" },
      { name: "orderId", type: "string" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Clients = InferredTypes["clients"];
export type ClientsRecord = Clients & XataRecord;

export type Orders = InferredTypes["orders"];
export type OrdersRecord = Orders & XataRecord;

export type OrderDetails = InferredTypes["order_details"];
export type OrderDetailsRecord = OrderDetails & XataRecord;

export type DatabaseSchema = {
  clients: ClientsRecord;
  orders: OrdersRecord;
  order_details: OrderDetailsRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL: "https://Albert-s-workspace-p2ne49.us-east-1.xata.sh/db/entele",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
