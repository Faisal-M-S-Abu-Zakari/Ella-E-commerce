import express from "express";
import adminAuth from "./../middleware/adminAuth.js";
import authUser from "../middleware/auth.js";
import {
  PlaceOrder,
  PlaceOrderStripe,
  allOrders,
  userOrders,
  updateStatus,
  verifyStripe,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

// Admin Features
orderRouter.post("/list", adminAuth, allOrders);
orderRouter.post("/status", adminAuth, updateStatus);

// Payment Features
orderRouter.post("/place", authUser, PlaceOrder);
orderRouter.post("/stripe", authUser, PlaceOrderStripe);

// User Features
orderRouter.post("/userorders", authUser, userOrders);

// verify payment
orderRouter.post("/verifyStripe", authUser, verifyStripe);

export default orderRouter;
