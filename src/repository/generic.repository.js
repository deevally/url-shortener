import { ShortUrl } from "../models/url-shortener.model";
/**
 * @description GenericRepository
 * @class GenericRepository
 */

/**
 * @description create a new document
 * @param {Model} Model
 * @param {option} options
 * @returns {document} returns a newly created document
 */

async function create(Model, options) {
  try {
    const document = await Model.create(options);
    return document;
  } catch (error) {
    throw error;
  }
}



/**
 * @description deletes a document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Deletes a particular Document
 */

 async function deleteRecord(Model, id) {
  try {
    const documents = await Model.findByIdAndRemove({ _id: id });

    return documents;
  } catch (error) {
    throw error;
  }
}




/**
 * @description Fetch one document
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Gets a particular Document
 */

async function findById(Model, id) {
  try {
    const documents = await Model.findOne({ _id: id }).exec();
    return documents;
  } catch (error) {
    throw error;
  }
}


/**
 * @description Fetch document by Url
 * @param {object} Model
 * @param {object} query
 * @param {object} options Query options
 * @returns {Document} Gets a particular Document
 */

 async function findUrl({originalUrl, urlId}) {
  try {
    const documents = await ShortUrl.findOne({
      $or: [{originalUrl }, {urlId}]}).exec();
    return documents;
  } catch (error) {
    throw error;
  }
}
export default {
  create,
  deleteRecord,
  findById,
  findUrl
};
