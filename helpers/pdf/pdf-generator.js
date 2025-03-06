import puppeteer from "puppeteer";

let browser;

export async function generatePDF(html) {
  if (!browser) {
    const newBrowser = await puppeteer.launch({
      headless: true,
    });
    if (browser) {
      newBrowser.close();
    } else {
      browser = newBrowser;
    }
  }

  const page = await browser.newPage();
  try {
    await page.setContent(html);
    return await page.pdf({
      format: "A4",
      margin: {
        bottom: "10mm",
        top: "10mm",
        left: "15mm",
        right: "15mm",
      },
      printBackground: true,
      preferCSSPageSize: true,

      scale: 0.8,
      displayHeaderFooter: false,
    });
  } finally {
    await page.close();
  }
}
