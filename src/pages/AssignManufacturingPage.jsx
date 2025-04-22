import React, { useState } from "react";
import { MoveVertical, User } from "lucide-react";

const AssignManufacturingPage = () => {
  // Sample data
  const unassignedOrders = [
    {
      id: "ORD246",
      product: "Circuit Board v3",
      quantity: 300,
      deadline: "Apr 22, 2025",
      priority: "High",
    },
    {
      id: "ORD247",
      product: "Steel Bracket Set",
      quantity: 150,
      deadline: "Apr 25, 2025",
      priority: "Medium",
    },
    {
      id: "ORD248",
      product: "LED Panel Assembly",
      quantity: 80,
      deadline: "Apr 28, 2025",
      priority: "Low",
    },
  ];

  const managers = [
    {
      id: 1,
      name: "John Doe",
      title: "Production Manager",
      capacity: "70% Utilized",
      skills: ["Metal", "Assembly"],
      assignedOrders: [
        {
          id: "ORD241",
          product: "Steel Frame Assembly",
          quantity: 120,
          deadline: "Apr 15, 2025",
          priority: "High",
        },
      ],
    },
    {
      id: 2,
      name: "Emily Chen",
      title: "Production Supervisor",
      capacity: "40% Utilized",
      skills: ["Electronics", "Quality Control"],
      assignedOrders: [
        {
          id: "ORD240",
          product: "Aluminum Housing",
          quantity: 250,
          deadline: "Apr 20, 2025",
          priority: "Medium",
        },
      ],
    },
    {
      id: 3,
      name: "Robert Kim",
      title: "Manufacturing Lead",
      capacity: "55% Utilized",
      skills: ["Assembly", "Electronics"],
      assignedOrders: [
        {
          id: "ORD239",
          product: "Circuit Board v2",
          quantity: 500,
          deadline: "Apr 12, 2025",
          priority: "Low",
        },
      ],
    },
  ];

  const [draggedOrder, setDraggedOrder] = useState(null);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800 border-red-200";
      case "Medium":
        return "bg-amber-100 text-amber-800 border-amber-200";
      case "Low":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const handleDragStart = (order) => {
    setDraggedOrder(order);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, managerId) => {
    e.preventDefault();
    if (draggedOrder) {
      // In a real app, this would update the state and send to backend
      console.log(`Assigned order ${draggedOrder.id} to manager ${managerId}`);
      setDraggedOrder(null);
    }
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Assign Manufacturing</h1>
        <p className="text-sm text-gray-600">
          Drag and drop orders to assign them to manufacturing managers
        </p>
      </div>

      <div className="grid grid-cols-4 gap-6">
        {/* Unassigned Orders Column */}
        <div className="col-span-1">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-medium mb-4 flex items-center">
              <MoveVertical className="mr-2 text-indigo-600" size={18} />
              Unassigned Orders
            </h2>
            <div className="space-y-3">
              {unassignedOrders.map((order) => (
                <div
                  key={order.id}
                  draggable
                  onDragStart={() => handleDragStart(order)}
                  className={`p-3 border-2 rounded-lg cursor-move ${getPriorityColor(
                    order.priority
                  )} hover:shadow-md`}
                >
                  <div className="font-medium">{order.id}</div>
                  <div>{order.product}</div>
                  <div className="text-sm mt-1">
                    Qty: {order.quantity} · Due: {order.deadline}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Managers Columns */}
        {managers.map((manager) => (
          <div
            key={manager.id}
            className="col-span-1"
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, manager.id)}
          >
            <div className="bg-white p-4 rounded-lg shadow h-full">
              <div className="flex items-center mb-3">
                <div className="bg-indigo-100 p-2 rounded-full">
                  <User size={20} className="text-indigo-600" />
                </div>
                <div className="ml-2">
                  <h3 className="font-medium">{manager.name}</h3>
                  <p className="text-sm text-gray-600">{manager.title}</p>
                </div>
              </div>

              <div className="flex justify-between mb-4 text-sm">
                <span className="text-gray-600">{manager.capacity}</span>
                <div className="flex space-x-1">
                  {manager.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-0.5 bg-gray-100 text-gray-800 rounded"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t pt-3 space-y-3">
                <h4 className="font-medium text-sm text-gray-600 mb-2">Assigned Orders</h4>
                {manager.assignedOrders.map((order) => (
                  <div
                    key={order.id}
                    className={`p-3 border-2 rounded-lg ${getPriorityColor(order.priority)}`}
                  >
                    <div className="font-medium">{order.id}</div>
                    <div>{order.product}</div>
                    <div className="text-sm mt-1">
                      Qty: {order.quantity} · Due: {order.deadline}
                    </div>
                  </div>
                ))}
                <div
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center text-gray-500 h-20 flex items-center justify-center"
                >
                  Drop order here
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AssignManufacturingPage;