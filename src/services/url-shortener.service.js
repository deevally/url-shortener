import ErrorResponse from "../utils/error.response";
import GenericRepository from "../repository/generic.repository";
import validUrl from "valid-url";
import { nanoid } from 'nanoid'
import { StatusMessages, ResponseCode } from "../utils/constants";
import { ShortUrl } from "../models/url-shortener.model";
import { NODE_ENV, BASE_URL_TEST,BASE_URL_PROD,BASE_URL } from "../config/config";

/**
 * @description Url Service
 * @class UrlService
 */


/**
 * @description Shorten Url
 * @returns {Object} Url
 */



async function ShortenUrl(originalUrl) {
  let url;
  if (NODE_ENV === "development") {
    url = BASE_URL;
  } else if (NODE_ENV === "test") {
    url = BASE_URL_TEST;
  } else if (NODE_ENV === "production") {
    url = BASE_URL_PROD;
  }
  if (!validUrl.isUri(url)) {
    throw new ErrorResponse(
      StatusMessages.INVALID_BASE_URL,
      ResponseCode.BAD_REQUEST
    );
  }
console.log("url",url)
  if (validUrl.isUri(originalUrl)) {

    const urlCode = nanoid(10);
    const originalUrlLink = {
      originalUrl,
    };
    const findUrl = await GenericRepository.findUrl(originalUrlLink);

    if (findUrl) {
      findUrl.originalUrlClicks++;
      findUrl.save();
      return findUrl;
    }

    const shortUrl = `${url}/${urlCode}`;
    const options = {
      originalUrl,
      shortenedUrl: shortUrl,
      urlId: urlCode,
      date: new Date(),
    };
    const createUrlShortener = await GenericRepository.create(
      ShortUrl,
      options
    );
    return createUrlShortener;
  } else {
    throw new ErrorResponse(
      StatusMessages.INVALID_URL,
      ResponseCode.BAD_REQUEST
    );
  }
}
/**
 * @description Get original Url 
 * @returns {boolean} true
 */

async function GetUrl(urlId) {
  const urlCode  = {
    urlId,
  }
  const url = await GenericRepository.findUrl(urlCode);

  if (!url)
    throw new ErrorResponse(
      StatusMessages.URL_NOT_FOUND,
      ResponseCode.NOT_FOUND
    );
  return url.originalUrl;
}

/**
 * @description Delete Url Service
 * @returns {boolean} true
 */

async function DeleteUrl(urlId) {
  const urlCode  = {
    urlId,
  }
  const url = await GenericRepository.findUrl(urlCode);
  if (!url)
    throw new ErrorResponse(
      StatusMessages.URL_NOT_FOUND,
      ResponseCode.NOT_FOUND
    );
  const deleteUrl = await GenericRepository.deleteRecord(ShortUrl, url.id);
  if (deleteUrl) return true;
}
export default {
  ShortenUrl,
  DeleteUrl,
  GetUrl
};
