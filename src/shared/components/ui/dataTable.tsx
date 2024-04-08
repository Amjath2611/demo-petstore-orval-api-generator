'use client';

import { Pet } from "@/api/orval/model";
import { useDeletePet, useUpdatePet, deletePet } from "@/api/orval/endpoints";
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';


interface DataTableProps {
  data: Pet[];
  isFilter: boolean;
}

const DataTable = ({ data, isFilter }: DataTableProps) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedItem, setEditedItem] = useState<any>({});

  const openEditModal = (item: any) => {
    setSelectedItem(item);
    setEditedItem(item);
    setIsEditModalOpen(true);
  };

  const {
    data: updateStatus,
    mutate: updateStatusMutate,
  } = useUpdatePet();

  const {
    data: deleteStatus,
    mutate: deleteStatusMutate,
  } = useDeletePet();


  useEffect(() => {
    if (updateStatus) {
      setIsEditModalOpen(false);
      router.refresh();
    }
  }, [updateStatus]); 


  const handleEditSubmit = async () => {
    console.log('Edited Item:', editedItem);
  try {
    updateStatusMutate({ data: editedItem });
  } catch (error) {
    console.log('Error:', error);
  }
};

const handleDeleteSubmit = async (deletedItem: any) => {
  console.log('Deleted Item:', deletedItem);
  try {
    const res = await deletePet(deletedItem.id, {headers: {"Api-key":'special-key'}});
    if(res) {
      router.refresh();
    }
 } catch (error) {
    console.log('Error:', error);
  }
};


const filteredData = data.filter((item: any) =>
  item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
);

return (<>

  {/* Search input */}
  {isFilter && <input
    type="text"
    placeholder="Search..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="mb-4 p-2 border rounded"
  />}

  <div className="table-wrp block max-h-96">
    <table className="w-full border-b">
      {/* Table headers */}
      <thead className="bg-white border-b sticky top-0 text-base">
        <tr className="bg-gray-200">
          <th className="px-4 font-medium py-2">ID</th>
          <th className="px-4 font-medium py-2">Pet Name</th>
          <th className="px-4 font-medium py-2">Status</th>
          <th className="px-4 font-medium py-2">Actions</th>
        </tr>
      </thead>
      {/* Table body */}
      <tbody className="overflow-y-auto">
        {/* Render filtered data */}
        {filteredData.map((item: any, index: any) => (
          <tr key={index}>
            <td className="border px-4 py-2 text-sm">{index + 1}</td>
            <td className="border px-4 py-2 text-sm">{item.name}</td>
            <td className="border px-4 py-2 text-sm">{item.status}</td>
            <td className="border px-4 py-2 text-sm">
              {/* Edit button */}
              <button
                className="bg-yellow-500 font-small text-white px-2 py-1 rounded mr-2"
                onClick={() => openEditModal(item)}
              >
                Edit
              </button>
              {/* Delete button */}
              <button className="bg-red-500 font-ligth text-white px-2 py-1 rounded" onClick={() => handleDeleteSubmit(item)}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  {isEditModalOpen && (
    <div className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-medium mb-4">Edit Item</h2>
        <label className='text-sm'>Pet Name</label>
        <input
          type="text"
          value={editedItem.name}
          onChange={(e) => setEditedItem({ ...editedItem, name: e.target.value })}
          className="w-full border p-2 rounded mb-4"
        />
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            onClick={handleEditSubmit}
          >
            Save
          </button>
          <button
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
            onClick={() => setIsEditModalOpen(false)}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )}
</>
);
};

export default React.memo(DataTable);
