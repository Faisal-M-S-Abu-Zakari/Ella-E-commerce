import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  return (
    <div className="border-r-2 w-[18%] min-h-screen">
      <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[15px]">
        <NavLink
          className="flex gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l item-center"
          to="/add"
        >
          <img className="w-5 h-5" src={assets.add_icon} alt="" />
          <p className="hidden md:block">Add Items</p>
        </NavLink>
        <NavLink
          className="flex gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l item-center"
          to="/list"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">List Items</p>
        </NavLink>
        <NavLink
          className="flex gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l item-center"
          to="/orders"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Orders</p>
        </NavLink>
        <NavLink
          className="flex gap-3 px-3 py-2 border border-gray-300 border-r-0 rounded-l item-center"
          to="/comments"
        >
          <img className="w-5 h-5" src={assets.order_icon} alt="" />
          <p className="hidden md:block">Comments</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
