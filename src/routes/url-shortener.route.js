import {Router} from "express";
const router = Router();
import UrlController from '../controllers/url-shortener.controller';
import ValidateMiddleware from '../middlewares/schema.validation';
import {validateUrl} from '../models/url-shortener.model';


router.post("/shorten-url",[ValidateMiddleware(validateUrl)] ,UrlController.ShortenUrl);
router.get("/orginalurl/:urlId", UrlController.GetOriginalUrl);
router.delete("/url/:urlId", UrlController.DeleteUrl);

export default router;