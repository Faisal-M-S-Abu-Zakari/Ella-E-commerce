import React, { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { Link } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ products: 0, orders: 0, comments: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        setLoading(true);
        // products (GET)
        const pRes = await fetch(`${backendUrl}/api/product/list`);
        const pJson = await pRes.json();
        const productsCount = Array.isArray(pJson.products)
          ? pJson.products.length
          : 0;

        // orders (POST to /api/order/list) - adminAuth required
        const oRes = await fetch(`${backendUrl}/api/order/list`, {
          method: "POST",
          headers: { "Content-Type": "application/json", token: token || "" },
          body: JSON.stringify({}),
        });
        const oJson = await oRes.json();
        const ordersCount = Array.isArray(oJson.orders)
          ? oJson.orders.length
          : 0;

        // comments (GET admin)
        const cRes = await fetch(`${backendUrl}/api/product/comments`, {
          headers: { token: token || "" },
        });
        const cJson = await cRes.json();
        const commentsCount = Array.isArray(cJson.comments)
          ? cJson.comments.length
          : 0;

        setCounts({
          products: productsCount,
          orders: ordersCount,
          comments: commentsCount,
        });
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  return (
    <div className="bg-white shadow p-6 rounded">
      <h2 className="mb-4 font-semibold text-2xl">Admin Dashboard</h2>
      <p className="mb-6 text-gray-500 text-sm">
        Quick overview and shortcuts for administrators.
      </p>

      {loading ? (
        <div className="py-8 text-center">Loading...</div>
      ) : error ? (
        <div className="text-red-600">{error}</div>
      ) : (
        <div className="gap-4 grid grid-cols-1 md:grid-cols-3">
          <div className="bg-gray-50 p-4 border rounded">
            <div className="text-gray-500 text-sm">Products</div>
            <div className="font-bold text-3xl">{counts.products}</div>
            <Link
              to="/list"
              className="inline-block mt-2 text-indigo-600 text-sm"
            >
              View products →
            </Link>
          </div>

          <div className="bg-gray-50 p-4 border rounded">
            <div className="text-gray-500 text-sm">Orders</div>
            <div className="font-bold text-3xl">{counts.orders}</div>
            <Link
              to="/orders"
              className="inline-block mt-2 text-indigo-600 text-sm"
            >
              View orders →
            </Link>
          </div>

          <div className="bg-gray-50 p-4 border rounded">
            <div className="text-gray-500 text-sm">Comments</div>
            <div className="font-bold text-3xl">{counts.comments}</div>
            <Link
              to="/comments"
              className="inline-block mt-2 text-indigo-600 text-sm"
            >
              Manage comments →
            </Link>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="mb-2 font-medium text-lg">Quick Actions</h3>
        <div className="flex flex-wrap gap-3">
          <Link
            to="/add"
            className="bg-indigo-600 px-4 py-2 rounded text-white"
          >
            Add Product
          </Link>
          <Link to="/list" className="px-4 py-2 border rounded">
            Product List
          </Link>
          <Link to="/orders" className="px-4 py-2 border rounded">
            Orders
          </Link>
          <Link to="/comments" className="px-4 py-2 border rounded">
            Comments
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
