import jwt from "jsonwebtoken";
const authUser = async (req, res, next) => {
  const { token } = req.headers;
  if (!token) {
    return res.json({
      success: false,
      message: "Not Authorized Login Again",
    });
  }
  try {
    const token_decode = jwt.verify(token, process.env.JWT_SECRET);
    // Ensure req.body exists (multipart/form-data requests may not have parsed req.body yet)
    if (!req.body) req.body = {};
    req.body.userId = token_decode.id;
    // Also set top-level property for handlers that prefer it
    req.userId = token_decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;
