import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/product/remove",
        { id },
        { headers: { token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log();
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <div className="mb-4">
        <Link
          to="/"
          className="inline-block bg-gray-100 px-3 py-1 border rounded text-gray-700 text-sm"
        >
          ← Back to Dashboard
        </Link>
      </div>
      <p className="mb-2">All Products List</p>
      <div className="flex flex-col gap-2">
        {/* -----List Table Title---- */}

        <div className="hidden items-center md:grid grid-cols-[1fr_3fr_1fr_1fr_1.5fr] bg-gray-100 px-2 py-1 border text-sm">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className="text-center">Action</b>
        </div>

        {/* ----Product List---- */}
        {list.map((item, index) => (
          <div
            className="items-center gap-2 grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1.5fr] px-2 py-1 border text-sm"
            key={index}
          >
            <img className="w-12" src={item.images[0]} alt="" />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>
              {currency}
              {item.price}
            </p>
            <div className="flex justify-center md:justify-center gap-2">
              <Link
                to={`/edit/${item._id}`}
                className="bg-blue-500 px-3 py-1 rounded text-white text-xs cursor-pointer"
              >
                Edit
              </Link>
              <p
                onClick={() => removeProduct(item._id)}
                className="bg-red-500 px-3 py-1 rounded text-white text-xs cursor-pointer"
              >
                Delete
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default List;
