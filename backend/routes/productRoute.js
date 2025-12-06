import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
  addReviewToProduct, // استدعاء الدالة الجديدة
  listAllComments,
  deleteComment,
  updateComment,
} from "../controllers/productController.js";
import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";
import auth from "../middleware/auth.js";

const productRouter = express.Router();

// إضافة منتج (للمسؤول فقط)
productRouter.post(
  "/add",
  adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);

// حذف منتج (للمسؤول فقط)
productRouter.post("/remove", adminAuth, removeProduct);

// جلب منتج مفرد مع تقييماته
productRouter.post("/single", singleProduct);

// جلب كل المنتجات
productRouter.get("/list", listProducts);

// إضافة تقييم لمنتج (يجب أن يكون المستخدم مسجّل دخول)
productRouter.post("/review", auth, addReviewToProduct);

// Admin: manage comments
productRouter.get("/comments", adminAuth, listAllComments);
productRouter.delete(
  "/comments/:productId/:reviewId",
  adminAuth,
  deleteComment
);
productRouter.put("/comments/:productId/:reviewId", adminAuth, updateComment);

export default productRouter;
