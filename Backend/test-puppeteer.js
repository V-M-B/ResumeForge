const puppeteer = require("puppeteer");

async function test() {
    try {
        console.log("Launching puppeteer with system chrome");
        const browser = await puppeteer.launch({
            channel: "chrome",
            headless: true,
            args: ["--no-sandbox", "--disable-setuid-sandbox"]
        });
        console.log("Browser launched");
        await browser.close();
        console.log("Browser closed");
    } catch (e) {
        console.log("Puppeteer ERROR", e);
    }
}
test();
