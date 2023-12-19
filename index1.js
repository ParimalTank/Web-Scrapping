const puppeteer = require("puppeteer");

const getData = async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })


    // Open a new page
    const page = await browser.newPage();

    await page.goto("https://books.toscrape.com/", {
        waitUntil: "domcontentloaded"
    })

    const pageDetails = await page.evaluate(() => {
        const books = [];
        const bookElements = document.querySelectorAll(".product_pod");

        bookElements.forEach((bookElement) => {
            const title = bookElement.querySelector("h3 > a").getAttribute("title");
            const price = bookElement.querySelector(".price_color").textContent;

            books.push({ title, price });
        });

        return books;
    });

    console.log("Books:", pageDetails);

    //Close the browser
    await browser.close();
}

getData();