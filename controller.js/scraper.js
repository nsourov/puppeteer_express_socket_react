const puppeteer = require("puppeteer");

const scraper = async (res, url) => {
	res.io.emit("scraper", "launching browser");

	const browser = await puppeteer.launch({ headless: true });
	const page = await browser.newPage();
	res.io.emit("scraper", "navigation to " + url);
	await page.goto(url);
	// Type into search box.

	res.io.emit("scraper", "input search " + "Headless Chrome");

	await page.type("#searchbox input", "Headless Chrome");

	// Wait for suggest overlay to appear and click "show all results".
	const allResultsSelector = ".devsite-suggest-all-results";
	await page.waitForSelector(allResultsSelector);
	await page.click(allResultsSelector);

	// Wait for the results page to load and display the results.
	const resultsSelector = ".gsc-results .gsc-thumbnail-inside a.gs-title";
	await page.waitForSelector(resultsSelector);

	res.io.emit("scraper", "extracting data");

	// Extract the results from the page.
	const links = await page.evaluate(resultsSelector => {
		const anchors = Array.from(document.querySelectorAll(resultsSelector));
		return anchors.map(anchor => {
			const title = anchor.textContent.split("|")[0].trim();
			return `${title} - ${anchor.href}`;
		});
	}, resultsSelector);
	await browser.close();

	res.io.emit("scraper", "complete scraping");

	return links;
};
module.exports = scraper;
