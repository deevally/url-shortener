import { Router } from "express";
import UrlRoute from "./url-shortener.route";

const router = Router();

router.get("/", (req, res) => {
  res.status(200).json({
    Message: "Welcome to QU-Url Shortener",
  });
});


router.use("/", UrlRoute);


export default router;
