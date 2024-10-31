import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem, removeItem, updateItem } from "./redtool/slices/crudSlice";

const CrudTable = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.crud.items);

  const [newItemName, setNewItemName] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [editingItemName, setEditingItemName] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const handleAddItem = () => {
    if (newItemName) {
      dispatch(addItem({ id: Date.now(), name: newItemName }));
      setNewItemName("");
    }
  };


  const handleUpdateItem = (id) => {
    if (editingItemName) {
      dispatch(updateItem({ id, name: editingItemName }));
      setEditingItemId(null);
      setEditingItemName("");
    }
  };
  const handleDeleteItem = (id) => {
    dispatch(removeItem(id));
  };

  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  
  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-center">CRUD Table</h2>
      <div className="flex justify-center mb-6">
        <input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          type="search"
          placeholder="Search..."
          className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-1/2"
        />
      </div>
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Enter item name"
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
          className="p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 w-2/3"
        />
        <button
          onClick={handleAddItem}
          className="p-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-200"
        >
          Add Item
        </button>
      </div>
      <table className="min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 p-2">ID</th>
            <th className="border border-gray-300 p-2">Name</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredItems.map((item) => (
            <tr key={item.id} className="hover:bg-gray-50">
              <td className="border border-gray-300 p-2 text-center">
                {item.id}
              </td>
              <td className="border border-gray-300 p-2">
                {editingItemId === item.id ? (
                  <input
                    type="text"
                    value={editingItemName}
                    onChange={(e) => setEditingItemName(e.target.value)}
                    className="p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="border border-gray-300 p-2 flex justify-center space-x-2">
                {editingItemId === item.id ? (
                  <>
                    <button
                      onClick={() => handleUpdateItem(item.id)}
                      className="p-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition duration-200"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingItemId(null)}
                      className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditingItemId(item.id);
                        setEditingItemName(item.name);
                      }}
                      className="p-1 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="p-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-200"
                    >
                      Delete
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CrudTable;
