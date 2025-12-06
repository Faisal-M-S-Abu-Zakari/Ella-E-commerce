import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";
import Card from "./ui/Card";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link to={`/product/${id}`} className="no-underline">
      <Card className="flex flex-col hover:shadow-md p-3 h-full transition-transform hover:-translate-y-1">
        <div className="flex-shrink-0 rounded-lg overflow-hidden">
          <img
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-300 transform"
            src={image[0]}
            alt={name}
          />
        </div>

        <div className="flex flex-col flex-1 justify-between mt-3">
          <p className="mb-1 h-12 overflow-hidden font-medium text-text text-sm">
            {name}
          </p>
          <p className="mt-3 font-semibold text-primary text-sm">
            {currency}
            {price}
          </p>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItem;
