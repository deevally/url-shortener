import ErrorResponse from "../utils/error.response";

const validate = (validator) => {
    return (req, res, next) => {
      const { error } = validator(req.body)
      if (error) {
          return next(new ErrorResponse(error.details[0].message, 400))
      }
      next();
    }
  }

  module.exports = validate;