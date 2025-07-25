const express = require("express");

const urlRouter = express.Router();
const urlController = require("../controller/url");

urlRouter.post("/", urlController.generateShortUrl);
urlRouter.get("/:short_url", urlController.redirectToLongUrl);
urlRouter.get("/analytics/:short_url", urlController.getUrlAnalytics);

module.exports = urlRouter;
