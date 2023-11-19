import { useEffect, useState } from "react";
import { BiEdit, BiRefresh, BiTrash } from "react-icons/bi";
import "../globals.css";
import { formatDate } from "../utils";
import Box from "./Box";
import Button from "./Button";
import Input from "./Input";
import { ConfirmDeleteModal, EditRecordModal } from "./Modal";

type responseData = {
  name: string;
  email: string;
  amountOfOrders: number;
  xata: {
    createdAt: string;
    updatedAt: string;
  };
};

export default function ClientsView() {
  const [listOfClients, setListOfClients] = useState<responseData[]>([]);
  const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
  const [showEditRecordModal, setShowEditRecordModal] = useState(false);

  const [whichClient, setWhichClient] = useState({
    name: "",
    email: "",
  });

  function closeModal() {
    setShowConfirmDeleteModal(false);
    setShowEditRecordModal(false);
  }

  function onClientRecordClick(name: string, email: string) {
    setShowEditRecordModal(true);
    setWhichClient({ name, email });
    console.log(name, email);
  }

  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:4321/api/clients/all");
      const data: responseData[] = await response.json();
      setListOfClients(data);
    }

    fetchData();
  }, []);
  return (
    <div className="p-[17px]">
      <div className="flex pb-4 gap-x-3 justify-center items-center">
        <h1 className="text-neutral-800 font-semibold text-2xl whitespace-nowrap">
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
          <Button
            onClick={() => setShowConfirmDeleteModal(true)}
            className="hover:bg-red-200 text-red-500"
          >
            <BiTrash size={20} />
            Delete All
          </Button>
        </Box>
      </div>

      <Box className="overflow-scroll max-h-[76vh]">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
            <div className="inline-block min-w-full">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead className="border-b">
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
                        onClick={() =>
                          onClientRecordClick(client.name, client.email)
                        }
                        className="border-b py-2 hover:bg-neutral-200 duration-300 cursor-pointer"
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
      </Box>

      <ConfirmDeleteModal
        onClose={closeModal}
        visible={showConfirmDeleteModal}
        header={`Delete all ${listOfClients.length} records of clients?`}
        description="Are you sure you want to delete all records of clients? This action cannot be undone"
        icon={BiTrash}
      />

      <EditRecordModal
        onClose={closeModal}
        visible={showEditRecordModal}
        header="Edit Record"
        description=""
        icon={BiEdit}
        clientName={whichClient.name}
        clientEmail={whichClient.email}
      />
    </div>
  );
}
