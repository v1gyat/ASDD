import React, { useState } from "react";

export default function OrderFormModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    product: "",
    quantity: "",
    rate: "",
    deadline: "",
    manager: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <div className="bg-white rounded-2xl shadow-xl p-6 w-full max-w-lg">
        <h2 className="text-xl font-semibold mb-4">Create New Order</h2>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-1">Product</label>
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select product</option>
              <option value="Dhoop A">Dhoop A</option>
              <option value="Perfume B">Perfume B</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Quantity</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            <div>
              <label className="block font-medium mb-1">Rate</label>
              <input
                type="number"
                name="rate"
                value={formData.rate}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Delivery Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Assign to Manager</label>
            <select
              name="manager"
              value={formData.manager}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            >
              <option value="">Select manager</option>
              <option value="Manager 1">Manager 1</option>
              <option value="Manager 2">Manager 2</option>
            </select>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
