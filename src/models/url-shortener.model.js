import mongoose from "mongoose";
import Joi from "joi";
import mongooseUniqueValidator from "mongoose-unique-validator";
import mongoosePaginate from "mongoose-paginate-v2";
const { Schema } = mongoose;

const UrlSchema = new Schema(
  {
    urlId: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      index: {
        unique: false,
      }
    },
    originalUrl: {
      type: String,
      required: true,
      trim: true,
      index: {
        unique: false,
      }
    },
    shortenedUrl: {
      type: String,
      required: true
    },
    date:{
      type: String,
      default: Date.now
    }
  
  },
  { timestamps: true }
);

const validateUrl = (k) => {
  const schema = Joi.object({
    urlId: Joi.string(),
    originalUrl: Joi.string(),
    shortenedUrl: Joi.string(),
  
  });

  return schema.validate(k);
};



UrlSchema.plugin(mongoosePaginate);
UrlSchema.plugin(mongooseUniqueValidator);

UrlSchema.set("toObject", { virtuals: true });
UrlSchema.set("toJSON", { virtuals: true });

const ShortUrl = mongoose.model("ShortenedUrl", UrlSchema);

module.exports = {
  ShortUrl,
  validateUrl,
};
