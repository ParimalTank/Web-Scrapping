const puppeteer = require("puppeteer");


// Website For Scrapping
// https://quotes.toscrape.com/

const getQuotes = async () => {
    // Start a Puppeteer session with:
    // - a visible browser ( headless : false - easier to debug because you'll see the browser in action)
    // - no default viewport (`defaultViewPort : null` - website page will in full width and height )

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null
    })

    // Open a new page
    const page = await browser.newPage();

    // On this new page:
    // - open the "http://quotes.toscrape.com/" website
    // - wait until the dom content is loaded (HTML is ready)

    await page.goto("http://quotes.toscrape.com/", {
        waitUntil: "domcontentloaded"
    })

    // Get Page Data
    // ( evaluate method it'll execute the function passed as a parameter in the page context and returns the result)


    // This is Only fetch one Data

    // --------------------------------------

    // Fetch the first element with class "quote".
    // Get the displayed text and return it.
    // const quote = document.querySelector(".quote");

    // Fetch the sub-element from the previously fetched quote element
    // Get the displayed text and return it(`.innerText`)

    // Return Only one Data
    // const text = quote.querySelector(".text").innerText;
    // const author = quote.querySelector(".author").innerText;

    //     return { text, author }
    // })

    // ----------------------------------------

    // Get All Div with className ".quote"

    const quotes = await page.evaluate(() => {

        const quoteList = document.querySelectorAll(".quote");

        // Convert the quoteList to an iterable array
        // For each quote fetch the text and author

        return Array.from(quoteList).map((quote) => {
            // Fetch Sub-element from the previously fetched quote element
            // Get the displayed text and return it. (`.innerText`)

            const text = quote.querySelector(".text").innerHTML;
            const author = quote.querySelector(".author").innerHTML;

            return { text, author }
        })
    })

    // Display the quotes
    console.log(quotes);

    // Click on the  "Next page" button
    await page.click(".pager > .next > a");

    console.log("After the Next Page");

    const quotesDetailsInNextDetails = await page.evaluate(() => {

        const quoteList = document.querySelectorAll(".quote");

        // Convert the quoteList to an iterable array
        // For each quote fetch the text and author

        return Array.from(quoteList).map((quote) => {
            // Fetch Sub-element from the previously fetched quote element
            // Get the displayed text and return it. (`.innerText`)

            const text = quote.querySelector(".text").innerHTML;
            const author = quote.querySelector(".author").innerHTML;

            return { text, author }
        })
    })

    console.log("quotesDetailsInNextDetails", quotesDetailsInNextDetails);

    //Close the browser
    await browser.close();
}

// Start the Scrapping
getQuotes();