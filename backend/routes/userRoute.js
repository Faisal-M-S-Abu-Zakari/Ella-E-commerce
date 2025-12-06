import express from "express";
import {
  loginUser,
  registerUser,
  adminLogin,
  getProfile,
  uploadAvatar,
  getAdminProfile,
  uploadAdminAvatar,
} from "../controllers/userController.js";
import authUser from "../middleware/auth.js";
import upload from "../middleware/multer.js";

import adminAuth from "../middleware/adminAuth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.post("/admin", adminLogin);

// Protected route to get current user's profile
userRouter.post("/me", authUser, getProfile);

// Upload avatar (protected). Field name: `avatar`
userRouter.post("/avatar", authUser, upload.single("avatar"), uploadAvatar);

// Admin profile routes (require adminAuth)
userRouter.post("/admin/profile", adminAuth, getAdminProfile);
userRouter.post(
  "/admin/avatar",
  adminAuth,
  upload.single("avatar"),
  uploadAdminAvatar
);

export default userRouter;
