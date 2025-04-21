import { ApiError } from "../utils/apiError.js";

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message, errors: err.errors });
  }
  console.error(err);
  res.status(500).json({ success: false, message: "Internal Server Error" });
};

export { errorHandler };