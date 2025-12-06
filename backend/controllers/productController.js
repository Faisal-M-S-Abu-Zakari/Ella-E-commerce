import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

// إضافة منتج جديد
const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];
    const image4 = req.files.image4 && req.files.image4[0];

    const images = [image1, image2, image3, image4].filter(
      (item) => item !== undefined
    );

    const imagesUrl = await Promise.all(
      images.map(async (image) => {
        try {
          const result = await cloudinary.uploader.upload(image.path, {
            resource_type: "image",
          });
          return result.secure_url;
        } catch (err) {
          // Detailed logging to help diagnose TLS / network / auth errors
          console.error("Cloudinary upload error:", {
            message: err && err.message,
            code: err && err.code,
            name: err && err.name,
            stack: err && err.stack,
          });
          throw err; // rethrow so outer catch handles response
        }
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      bestseller: bestseller === "true",
      sizes: JSON.parse(sizes),
      images: imagesUrl,
      date: Date.now(),
    };

    const product = new productModel(productData);
    await product.save();

    res.json({
      success: true,
      message: "Product added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// جلب كل المنتجات
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({ success: true, products });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// حذف منتج
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// جلب منتج مفرد مع التقييمات ومتوسط التقييم
const singleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    const product = await productModel.findById(productId);

    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        : 0;

    res.json({
      success: true,
      product,
      avgRating,
      reviews: product.reviews,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

const addReviewToProduct = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    // prefer authenticated user id from middleware
    const userId = req.userId || req.body.userId;

    if (!userId)
      return res
        .status(401)
        .json({ success: false, message: "Not authorized" });

    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // fetch user details to save name/avatar with the review
    const user = await userModel.findById(userId).select("name avatar");

    const reviewObj = {
      user: userId,
      rating,
      comment,
      name: user ? user.name : undefined,
      avatar: user ? user.avatar : undefined,
    };

    product.reviews.push(reviewObj);
    await product.save();

    const avgRating =
      product.reviews.length > 0
        ? product.reviews.reduce((sum, r) => sum + r.rating, 0) /
          product.reviews.length
        : 0;

    res.status(201).json({
      success: true,
      reviews: product.reviews,
      avgRating,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ success: false, message: error.message });
  }
};

// Admin: list all comments across products
const listAllComments = async (req, res) => {
  try {
    const products = await productModel.find({}, "name reviews");
    const comments = [];
    products.forEach((p) => {
      p.reviews.forEach((r) => {
        comments.push({
          productId: p._id,
          productName: p.name,
          reviewId: r._id,
          user: r.user,
          name: r.name,
          avatar: r.avatar,
          rating: r.rating,
          comment: r.comment,
          createdAt: r.createdAt,
        });
      });
    });
    res.json({ success: true, comments });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: delete a comment by productId and reviewId
const deleteComment = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    // validate ids to avoid CastError
    const mongoose = await import("mongoose");
    const ObjectId = mongoose.default.Types.ObjectId;
    if (!ObjectId.isValid(productId) || !ObjectId.isValid(reviewId)) {
      return res.status(400).json({ success: false, message: "Invalid id" });
    }

    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    // remove review by filtering to avoid potential subdocument method issues
    const before = product.reviews.length;
    product.reviews = product.reviews.filter(
      (r) => r._id.toString() !== reviewId
    );
    if (product.reviews.length === before) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }

    await product.save();
    res.json({ success: true, message: "Review deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Admin: update a comment
const updateComment = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;
    const product = await productModel.findById(productId);
    if (!product)
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });

    const review = product.reviews.id(reviewId);
    if (!review)
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });

    if (rating) review.rating = rating;
    if (comment) review.comment = comment;
    await product.save();

    res.json({ success: true, review });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

export {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  addReviewToProduct,
  listAllComments,
  deleteComment,
  updateComment,
};
