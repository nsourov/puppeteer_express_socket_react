const express = require("express");
const router = express.Router();
const scraper = require("../controller.js/scraper");

router.get("/", function(req, res, next) {
	return res.json({ title: "Express" });
});

router.post("/", async function(req, res, next) {
	const result = await scraper(res, req.body.url);
	return res.json({ result });
});

module.exports = router;
