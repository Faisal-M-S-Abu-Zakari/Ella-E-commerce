import { useEffect, useState } from "react";
import { backendUrl } from "../App";
import { Link } from "react-router-dom";

const Dashboard = ({ token }) => {
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({ products: 0, orders: 0, comments: 0 });
  const [error, setError] = useState(null);
  const [admin, setAdmin] = useState({
    name: "Administrator",
    email: "",
    avatar: "",
  });
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

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

        // fetch admin profile
        const adminRes = await fetch(`${backendUrl}/api/user/admin/profile`, {
          method: "POST",
          headers: { token: token || "" },
        });
        const adminJson = await adminRes.json();
        if (adminJson.success && adminJson.admin) {
          // Load persisted avatar from localStorage if available
          const savedAvatar = localStorage.getItem("adminAvatar");
          setAdmin({
            ...adminJson.admin,
            avatar: savedAvatar || adminJson.admin.avatar,
          });
        }
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load stats");
      } finally {
        setLoading(false);
      }
    };

    fetchCounts();
  }, [token]);

  const handleAvatarUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setUploadingAvatar(true);
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await fetch(`${backendUrl}/api/user/admin/avatar`, {
        method: "POST",
        headers: { token: token || "" },
        body: formData,
      });
      const json = await res.json();

      if (json.success && json.avatar) {
        setAdmin((prev) => ({ ...prev, avatar: json.avatar }));
      } else {
        alert(json.message || "Failed to upload avatar");
      }
    } catch (error) {
      console.error("Avatar upload error:", error);
      alert("Error uploading avatar");
    } finally {
      setUploadingAvatar(false);
    }
  };

  return (
    <div>
      {/* Admin Profile Section */}
      <div className="bg-white shadow mb-8 p-6 rounded">
        <h2 className="mb-4 font-semibold text-2xl">Admin Profile</h2>
        <div className="flex md:flex-row flex-col gap-6">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <label htmlFor="avatarInput" className="cursor-pointer">
              {admin.avatar ? (
                <img
                  src={admin.avatar}
                  alt="admin"
                  className="border-2 border-gray-300 rounded-full w-24 h-24 object-cover"
                />
              ) : (
                <div className="flex justify-center items-center bg-gray-300 border-2 border-gray-400 rounded-full w-24 h-24 font-bold text-gray-600 text-2xl">
                  {admin.name.charAt(0).toUpperCase()}
                </div>
              )}
            </label>
            <input
              id="avatarInput"
              type="file"
              accept="image/*"
              hidden
              onChange={handleAvatarUpload}
              disabled={uploadingAvatar}
            />
            <p className="mt-2 text-gray-600 text-sm">
              {uploadingAvatar ? "Uploading..." : "Click avatar to upload"}
            </p>
          </div>

          {/* Admin Info */}
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <p className="text-gray-600 text-sm">Role</p>
              <p className="font-semibold text-lg">Administrator</p>
            </div>
            <div>
              <p className="text-gray-600 text-sm">Email</p>
              <p className="font-semibold text-lg">{admin.email}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats & Actions Section */}
      <div className="bg-white shadow p-6 rounded">
        <h2 className="mb-4 font-semibold text-2xl">Dashboard Overview</h2>
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
    </div>
  );
};

export default Dashboard;
