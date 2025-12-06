import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Button from "../components/ui/Button";
import Avatar from "../components/ui/Avatar";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const { backendUrl, token, navigate } = useContext(ShopContext);
  const [user, setUser] = useState<any>(null);
  const [ordersCount, setOrdersCount] = useState<number>(0);
  const [uploading, setUploading] = useState(false);

  const loadProfile = async () => {
    try {
      if (!token) return;
      const { data } = await axios.post(
        backendUrl + "/api/user/me",
        {},
        { headers: { token } }
      );
      if (data.success) {
        setUser(data.user);
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Failed to load profile");
    }
  };

  const loadOrdersCount = async () => {
    try {
      if (!token) return;
      const { data } = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (data.success) {
        let count = 0;
        data.orders.forEach(
          (o: any) => (count += o.items ? o.items.length : 0)
        );
        setOrdersCount(count);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadProfile();
    loadOrdersCount();
  }, [token]);

  const onFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("avatar", file);
      const { data } = await axios.post(backendUrl + "/api/user/avatar", form, {
        headers: { token, "Content-Type": "multipart/form-data" },
      });
      if (data.success) {
        toast.success("Profile photo updated");
        // reload the profile from server to ensure DB/cloudinary value is used
        loadProfile();
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (error: any) {
      console.log(error);
      toast.error(error?.message || "Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="px-4 md:px-8 pt-16 border-t">
      <div className="mb-6">
        <Title text1={"MY"} text2={"PROFILE"} />
      </div>

      <div className="mx-auto max-w-4xl">
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-sky-500 to-indigo-600 p-8">
            <div className="flex items-center gap-4 md:gap-8">
              <label htmlFor="avatarInput" className="block">
                <Avatar src={user?.avatar} size={140} uploading={uploading} />
              </label>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                className="hidden"
              />

              <div className="text-white">
                <h2 className="font-semibold text-3xl leading-tight">
                  {user ? user.name : "Guest"}
                </h2>
                <p className="opacity-90 mt-1 text-sm">
                  {user ? user.email : "-"}
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <div className="bg-white/20 shadow-sm px-3 py-1 rounded-full text-white text-sm">
                    Orders: <span className="font-semibold">{ordersCount}</span>
                  </div>
                  <Button
                    onClick={() => navigate("/orders")}
                    className="bg-white/20 hover:bg-white/30 px-3 py-1.5 border border-white/30 text-white"
                  >
                    View Orders
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="gap-6 grid grid-cols-1 md:grid-cols-3">
              <div className="md:col-span-2">
                <h3 className="mb-3 font-medium text-lg">Account Details</h3>
                <div className="bg-secondary p-4 rounded">
                  <p className="text-muted text-sm">
                    <span className="font-medium">Name:</span>{" "}
                    {user ? user.name : "-"}
                  </p>
                  <p className="mt-2 text-muted text-sm">
                    <span className="font-medium">Email:</span>{" "}
                    {user ? user.email : "-"}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="mb-3 font-medium text-lg">Activity</h3>
                <div className="flex flex-col gap-3 bg-secondary p-4 rounded">
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">Total orders</span>
                    <span className="font-semibold">{ordersCount}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted text-sm">Joined</span>
                    <span className="text-muted text-sm">
                      {user
                        ? new Date(user?.createdAt || Date.now()).toDateString()
                        : "-"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
