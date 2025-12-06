import { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "./Title";
import ProductItem from "./ProductItem";
const LatestCollection = () => {
  const { products } = useContext(ShopContext);

  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className="my-12">
      <div className="mx-auto px-4 container">
        <div className="py-8 text-center">
          <Title text1={"LATEST"} text2={"COLLECTIONS"} />
          <p className="mx-auto max-w-2xl text-muted text-sm sm:text-base">
            The latest products from our collection. Check them out and find
            your new favorite.
          </p>
        </div>

        {/* Rendering Products */}
        <div className="gap-6 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              image={item.images}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LatestCollection;
