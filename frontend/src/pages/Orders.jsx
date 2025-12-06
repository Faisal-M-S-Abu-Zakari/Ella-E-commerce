import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import Loader from "../components/Loader";
import axios from "axios";
import { toast } from "react-toastify";

const Orders = () => {
  const [orderData, setOrderData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { backendUrl, token, currency } = useContext(ShopContext);

  const loadOrderData = async () => {
    setIsLoading(true);
    try {
      if (!token) {
        setOrderData([]);
        return null;
      }

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        let allOrdersItem = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrdersItem.push(item);
          });
        });
        setOrderData(allOrdersItem.reverse());
      } else {
        setOrderData([]);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
      setOrderData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className="pt-16 border-t">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      {/* Show loader or empty state if products are not loaded yet */}
      {isLoading ? (
        <Loader text="Loading orders..." />
      ) : orderData.length === 0 ? (
        <div className="py-16 text-center">
          <p className="font-medium text-gray-700 text-lg">
            You have no orders yet.
          </p>
          <p className="mt-2 text-muted text-sm">
            Once you place an order it will appear here.
          </p>
        </div>
      ) : (
        <div>
          {orderData.map((item, index) => (
            <div
              key={index}
              className="flex md:flex-row flex-col md:justify-between items-center gap-4 py-4 border-t border-b text-gray-700"
            >
              <div className="flex items-start gap-6 text-sm">
                <img className="w-16 sm:w-20" src={item.images[0]} alt="" />
                <div>
                  <p className="font-medium sm:text-base">{item.name}</p>
                  <div className="flex items-center gap-3 mt-1 text-gray-500 text-base">
                    <p className="text-lg">
                      {currency}
                      {item.price}
                    </p>
                    <p>Quantity: {item.quantity}</p>
                    <p>size: {item.size}</p>
                  </div>
                  <p className="mt-1">
                    Date:
                    <span className="text-gray-400">
                      {new Date(item.date).toDateString()}
                    </span>
                  </p>
                  <p className="mt-1">
                    Payment:
                    <span className="text-gray-400">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              <div className="flex justify-between md:w-1/2">
                <div className="flex items-center gap-2">
                  <p className="bg-green-500 rounded-full min-w-2 h-2"></p>
                  <p className="text-sm md:text-base">{item.status}</p>
                </div>
                <button
                  onClick={loadOrderData}
                  className="px-4 py-2 border rounded-sm font-medium text-sm"
                >
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
