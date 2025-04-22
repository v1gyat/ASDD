import React, { useState } from "react";
import { Plus, Filter, Download, Edit, Trash, CheckCircle, AlertCircle, Clock } from "lucide-react";
import OrderFormModal from "../components/OrderFormModal";
import TimelineTracker from "../components/TimelineTracker";

const OrdersPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Sample data for orders
  const orders = [
    {
      id: "ORD241",
      product: "Steel Frame Assembly",
      quantity: 120,
      status: "Manufacturing",
      deadline: "Apr 15, 2025",
      manager: "John Doe",
      priority: "High",
    },
    {
      id: "ORD240",
      product: "Aluminum Housing",
      quantity: 250,
      status: "Production",
      deadline: "Apr 20, 2025",
      manager: "Emily Chen",
      priority: "Medium",
    },
    {
      id: "ORD239",
      product: "Circuit Board v2",
      quantity: 500,
      status: "Inventory Check",
      deadline: "Apr 12, 2025",
      manager: "Robert Kim",
      priority: "Low",
    },
    {
      id: "ORD238",
      product: "Power Supply Unit",
      quantity: 100,
      status: "Dispatch",
      deadline: "Apr 10, 2025",
      manager: "Sarah Johnson",
      priority: "High",
    },
    {
      id: "ORD237",
      product: "Sensor Array",
      quantity: 75,
      status: "Delivered",
      deadline: "Apr 5, 2025",
      manager: "Mike Walsh",
      priority: "Medium",
    },
  ];

  const getStatusIcon = (status) => {
    switch (status) {
      case "Delivered":
        return <CheckCircle size={16} className="text-green-500" />;
      case "Manufacturing":
      case "Production":
      case "Inventory Check":
        return <Clock size={16} className="text-amber-500" />;
      case "Dispatch":
        return <Clock size={16} className="text-blue-500" />;
      default:
        return <AlertCircle size={16} className="text-gray-500" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Manufacturing":
      case "Production":
        return "bg-amber-100 text-amber-800";
      case "Inventory Check":
        return "bg-purple-100 text-purple-800";
      case "Dispatch":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-amber-100 text-amber-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Orders</h1>
          <p className="text-sm text-gray-600">Manage your sales and purchase orders</p>
        </div>
        <div className="flex space-x-3">
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center hover:bg-gray-50">
            <Filter size={16} className="mr-2" />
            Filter
          </button>
          <button className="px-3 py-2 rounded-lg border border-gray-300 text-gray-700 flex items-center hover:bg-gray-50">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button
            onClick={() => {
              setSelectedOrder(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700"
          >
            <Plus size={16} className="mr-2" />
            Create Order
          </button>
        </div>
      </div>

      {selectedOrder && (
        <div className="mb-6 bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-medium mb-3">Order Timeline</h2>
          <TimelineTracker status={selectedOrder.status} />
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Order ID
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Quantity
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Deadline
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Manager
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {orders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {order.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.product}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.quantity}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      order.status
                    )}`}
                  >
                    {getStatusIcon(order.status)}
                    <span className="ml-1">{order.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                      order.priority
                    )}`}
                  >
                    {order.priority}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{order.deadline}</td>
                <td className="px-6 py-4 whitespace-nowrap">{order.manager}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      View
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        setIsModalOpen(true);
                      }}
                      className="text-amber-600 hover:text-amber-900"
                    >
                      <Edit size={16} />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <Trash size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <OrderFormModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          order={selectedOrder}
        />
      )}
    </div>
  );
};

export default OrdersPage;