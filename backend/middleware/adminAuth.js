import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const token = req.headers.token;
    if (!token) {
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // Support legacy string payload (email+password) or new object payloads
    const legacyAdminKey = process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;
    const isLegacy =
      typeof token_decode === "string" && token_decode === legacyAdminKey;
    const isNewFormat =
      typeof token_decode === "object" &&
      (token_decode.admin === true || token_decode.role === "admin");
    if (!isLegacy && !isNewFormat) {
      console.log("adminAuth: invalid token payload", { token_decode });
      return res.json({
        success: false,
        message: "Not Authorized Login Again",
      });
    }
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default adminAuth;
