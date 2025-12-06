import { useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Login = ({ setToken }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onSubmithandler = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post(backendUrl + "/api/user/admin", {
        email,
        password,
      });
      if (response.data.success) {
        setToken(response.data.token);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <div className="bg-white shadow-md px-8 py-6 rounded-lg max-w-md">
        <h1 className="mb-4 font-bold text-2xl">Admin Panel</h1>
        <form onSubmit={onSubmithandler}>
          <div className="mb-3 min-w-72">
            <p className="mb-2 font-medium text-gray-700 text-sm">
              Email Address
            </p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="px-3 py-2 border border-gray-300 rounded-md outline-none w-full"
              type="email"
              placeholder="your@email.com"
              required
            />
          </div>
          <div className="mb-3 min-w-72">
            <p className="mb-2 font-medium text-gray-700 text-sm">Password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="px-3 py-2 border border-gray-300 rounded-md outline-none w-full"
              type="password"
              placeholder="Enter your password"
              required
            />
          </div>
          <button
            className="bg-black mt-2 px-4 py-2 rounded-md w-full text-white"
            type="submit"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
