
import ErrorResponse from "../utils/error.response";

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  let error = { ...err };
  error.message = err.message;

  //console.log(error);

  // Wrong Mongoose Object ID Error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    error = new ErrorResponse(message, 404);
  }

  // Handling Mongoose Validation Error
  if (err.name === "ValidationError") {
    const message = Object.values(err.errors).map((value) => value.message);
    error = new ErrorResponse(message, 400);
  }

  // Handle mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)} entered.`;
    error = new ErrorResponse(message, 400);
  }

  // Handling Wrong JWT token error
  if (err.name === "JsonWebTokenError") {
    const message = "JSON Web token is invalid. Try Again!";
    error = new ErrorResponse(message, 500);
  }

  // Handling Expired JWT token error
  if (err.name === "TokenExpiredError") {
    const message = "JSON Web token is expired. Try Again!";
    error = new ErrorResponse(message, 500);
  }

if(process.env.NODE_ENV === 'development'){
  res.status(error.statusCode).json({
    success: false,
    error: error.message || "Internal Server Error.",
    stack : err.stack
  });
}else {

  res.status(error.statusCode).json({
    success: false,
    error: error.message || "Internal Server Error.",
    });
}
};
