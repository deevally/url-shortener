import asyncHandler from "../middlewares/async";
import { StatusMessages, ResponseCode } from "../utils/constants";


/**
 * @description Url controller
 * @class UrlController
 */



/**
 * @description 
 * @returns {boolean}
 */

const GetOriginalUrl = asyncHandler(async (req, res, next) => {
  const { code } = req.query;
  try {
    const getLongUrL = await req.service.Url.AuthCallback(code);

  

    // Redirect back to the client side. [http://localhost:3000/] url can be changed to any other url used by the client side. 
    res.redirect("http://localhost:3000/");
  
  } catch (error) {
    next(error);
  }
});

/**
 * @description Shortens a Url
 * @returns {boolean} Returns the shortened Url
 */

const ShortenUrl = asyncHandler(async (req, res, next) => {
  
const { originalUrl} = req.body
  try {
    const result = await req.service.url.ShortenUrl(originalUrl);

    return res.status(ResponseCode.OK).json({
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

 const DeleteUrl= asyncHandler(async (req, res, next) => {

  const {UrlId} = req.params;
 try {
   const result = await req.service.Url.DeleteUrl(UrlId);

   if(result === true){
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
  DeleteUrl
};
