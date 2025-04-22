import React, { useState } from "react";
import { Plus, Filter, Edit, Trash, CheckCircle, XCircle } from "lucide-react";

const ProductsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [filterCategory, setFilterCategory] = useState("All");

  // Sample data for products
  const products = [
    {
      id: "PRD-001",
      name: "Steel Frame Assembly",
      sku: "SF-2025-A",
      stock: 87,
      price: 249.99,
      category: "Metal Components",
      status: "In Stock",
    },
    {
      id: "PRD-002",
      name: "Aluminum Housing",
      sku: "AH-2025-B",
      stock: 152,
      price: 129.50,
      category: "Metal Components",
      status: "In Stock",
    },
    {
      id: "PRD-003",
      name: "Circuit Board v2",
      sku: "CB-2025-V2",
      stock: 241,
      price: 74.99,
      category: "Electronics",
      status: "In Stock",
    },
    {
      id: "PRD-004",
      name: "Power Supply Unit",
      sku: "PSU-2025-500W",
      stock: 12,
      price: 89.99,
      category: "Electronics",
      status: "Low Stock",
    },
    {
      id: "PRD-005",
      name: "Sensor Array",
      sku: "SA-2025-PRO",
      stock: 0,
      price: 159.99,
      category: "Electronics",
      status: "Out of Stock",
    },
    {
      id: "PRD-006",
      name: "Rubber Gasket Set",
      sku: "RG-2025-10PK",
      stock: 310,
      price: 24.99,
      category: "Components",
      status: "In Stock",
    },
  ];

  const categories = ["All", "Metal Components", "Electronics", "Components"];

  const getStatusIcon = (status) => {
    switch (status) {
      case "In Stock":
        return <CheckCircle size={16} className="text-green-500" />;
      case "Low Stock":
        return <CheckCircle size={16} className="text-amber-500" />;
      case "Out of Stock":
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "In Stock":
        return "bg-green-100 text-green-800";
      case "Low Stock":
        return "bg-amber-100 text-amber-800";
      case "Out of Stock":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredProducts =
    filterCategory === "All"
      ? products
      : products.filter((product) => product.category === filterCategory);

  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Products</h1>
          <p className="text-sm text-gray-600">Manage your product catalog</p>
        </div>
        <div className="flex space-x-3">
          <div className="relative">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="appearance-none pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            <Filter
              size={16}
              className="absolute right-3 top-3 text-gray-400 pointer-events-none"
            />
          </div>
          <button
            onClick={() => {
              setSelectedProduct(null);
              setIsModalOpen(true);
            }}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg flex items-center hover:bg-indigo-700"
          >
            <Plus size={16} className="mr-2" />
            Add Product
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SKU
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredProducts.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                  {product.sku}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.stock}</td>
                <td className="px-6 py-4 whitespace-nowrap">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap">{product.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                      product.status
                    )}`}
                  >
                    {getStatusIcon(product.status)}
                    <span className="ml-1">{product.status}</span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setSelectedProduct(product);
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

      {/* Product modal would go here */}
    </div>
  );
};

export default ProductsPage;