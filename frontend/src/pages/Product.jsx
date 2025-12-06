import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import RelatedProducts from "../components/RelatedProducts";
import Loader from "../components/Loader";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Product = () => {
  const { productId } = useParams();
  const { currency, addToCart, user, token, backendUrl } =
    useContext(ShopContext);
  const navigate = useNavigate();

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);

  const [reviews, setReviews] = useState([]);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewSubmitting, setReviewSubmitting] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [avgRating, setAvgRating] = useState(0);

  const fetchProductData = async () => {
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/product/single`, {
        productId,
      });

      if (res.data && res.data.success) {
        const { product, reviews, avgRating } = res.data;
        setProductData(product);
        setImage(product?.images?.[0] || "");
        setReviews(reviews || []);
        setAvgRating(avgRating || 0);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductData();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [productId]);

  const handleAddToCart = async () => {
    setBtnLoading(true);
    await addToCart(productData._id, size);
    setBtnLoading(false);
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!token) {
      alert("Please login to submit a review");
      navigate("/login");
      return;
    }
    setReviewSubmitting(true);
    try {
      // نرسل userId من الفرونت بما أن auth.js يضعه في req.body.userId
      const res = await axios.post(
        `${backendUrl}/api/product/review`,
        {
          productId,
          rating: reviewRating,
          comment: reviewText,
        },
        { headers: { token } }
      );

      if (res.data.success) {
        setReviewText("");
        setReviewRating(5);
        setReviews(res.data.reviews);
        setAvgRating(res.data.avgRating);
        toast.success("Review submitted successfully!");
      } else {
        toast.error("Failed to submit review");
      }
    } catch (err) {
      console.log(err);
      toast.error("Failed to submit review");
    }
    setReviewSubmitting(false);
  };

  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating - fullStars >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
      <>
        {Array(fullStars)
          .fill("★")
          .map((s, i) => (
            <span key={"full" + i} className="text-yellow-500">
              {s}
            </span>
          ))}
        {halfStar && <span className="text-yellow-500">★</span>}
        {Array(emptyStars)
          .fill("☆")
          .map((s, i) => (
            <span key={"empty" + i} className="text-gray-300">
              {s}
            </span>
          ))}
      </>
    );
  };

  if (loading) return <Loader text="Loading product..." />;

  return productData ? (
    <div className="opacity-100 pt-10 border-t transition-opacity duration-500 ease-in">
      <ToastContainer position="top-right" autoClose={3000} />
      {/* Product Images & Info */}
      <div className="flex sm:flex-row flex-col gap-12 sm:gap-12">
        <div className="flex sm:flex-row flex-col-reverse flex-1 gap-3">
          <div className="flex sm:flex-col justify-between sm:justify-normal w-full sm:w-[18.7%] overflow-x-auto sm:overflow-y-scroll">
            {productData.images.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="flex-shrink-0 sm:mb-3 w-[24%] sm:w-full cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>

        <div className="flex-1">
          <h1 className="mt-2 font-medium text-2xl">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {renderStars(avgRating)}
            <p className="pl-2">({reviews.length})</p>
          </div>
          <p className="mt-5 font-medium text-3xl">
            {currency}
            {productData.price}
          </p>
          <p className="mt-5 md:w-4/5 text-muted">{productData.description}</p>

          {/* Sizes */}
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-2 px-4 bg-secondary ${
                    item === size ? "border-orange-500" : ""
                  }`}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={btnLoading}
            className="flex justify-center items-center bg-primary px-8 py-3 text-white text-sm"
          >
            {btnLoading ? (
              <div className="border-white border-t-2 border-b-2 rounded-full w-5 h-5 animate-spin"></div>
            ) : (
              "ADD TO CART"
            )}
          </button>
          <hr className="mt-8 sm:w-4/5" />
        </div>
      </div>

      {/* Description & Reviews */}
      <div className="mt-20">
        <div className="flex border-b">
          <button
            className="px-5 py-3 border-r font-medium text-sm"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Description
          </button>
          <button
            className="px-5 py-3 font-medium text-sm"
            onClick={() => setShowReviewForm(!showReviewForm)}
          >
            Reviews ({reviews.length})
          </button>
        </div>

        {/* Description Section */}
        <div className="px-6 py-6 border text-muted text-sm">
          <p>{productData.description}</p>
        </div>

        {/* Review Form */}
        {showReviewForm && (
          <div className="mt-4 px-6 py-6 border text-gray-500 text-sm">
            <h3 className="mb-2 font-semibold">Reviews ({reviews.length})</h3>
            <div className="flex flex-col gap-4">
              {reviews.map((review, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center pb-2 border-b"
                >
                  <div className="flex items-start gap-3">
                    {review.avatar ? (
                      <img
                        src={review.avatar}
                        alt={review.name}
                        className="rounded-full w-10 h-10 object-cover"
                      />
                    ) : (
                      <div className="flex justify-center items-center bg-gray-200 rounded-full w-10 h-10 text-gray-500 text-sm">
                        {review.name ? review.name.charAt(0) : "U"}
                      </div>
                    )}
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold">{review.name}</span>
                        <span className="text-yellow-500">
                          {"★".repeat(review.rating)}
                          {"☆".repeat(5 - review.rating)}
                        </span>
                      </div>
                      <p className="mt-1">{review.comment}</p>
                      <span className="text-muted text-xs">
                        {new Date(review.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Review Submission Form */}
            <form
              className="flex flex-col gap-2 mt-6"
              onSubmit={handleReviewSubmit}
            >
              <label className="font-medium">Your Rating:</label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`cursor-pointer text-2xl ${
                      reviewRating >= star ? "text-yellow-500" : "text-muted"
                    }`}
                    onClick={() => setReviewRating(star)}
                  >
                    ★
                  </span>
                ))}
              </div>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="px-2 py-1 border"
                rows={3}
                placeholder="Write your review..."
              />
              <button
                type="submit"
                disabled={reviewSubmitting || (!reviewText && !reviewRating)}
                className="bg-primary px-4 py-2 w-32 text-white"
              >
                {reviewSubmitting ? "Submitting..." : "Submit Review"}
              </button>
            </form>
          </div>
        )}
      </div>

      <RelatedProducts
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
