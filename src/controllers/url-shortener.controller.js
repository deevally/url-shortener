import asyncHandler from "../middlewares/async";
import { StatusMessages, ResponseCode } from "../utils/constants";

/**
 * @description Url controller
 * @class UrlController
 */

/**
 * @description Get Original url
 * @returns {boolean}
 */

const GetOriginalUrl = asyncHandler(async (req, res, next) => {
  const { urlId } = req.params;
  try {
    const getLongUrL = await req.service.url.GetUrl(urlId);
    
    // Redirect back to the original URL
    res.redirect(getLongUrL);
  } catch (error) {
    next(error);
  }
});

/**
 * @description Shortens a Url
 * @returns {boolean} Returns the shortened Url
 */

const ShortenUrl = asyncHandler(async (req, res, next) => {
  const { originalUrl } = req.body;
  try {
    const result = await req.service.url.ShortenUrl(originalUrl);

    return res.status(ResponseCode.CREATED).json({
      data: result,
      success: true,
    });
  } catch (error) {
    next(error);
  }
});

/**
 * @description Delete Url
 * @returns {boolean} true
 */

const DeleteUrl = asyncHandler(async (req, res, next) => {
  const { urlId } = req.params;
  try {
    const result = await req.service.url.DeleteUrl(urlId);

    if (result === true) {
      return res.status(ResponseCode.OK).json({
        success: true,
      });
    }
  } catch (error) {
    next(error);
  }
});

export default {
  ShortenUrl,
  GetOriginalUrl,
  DeleteUrl,
};
