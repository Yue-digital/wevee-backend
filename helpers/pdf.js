import puppeteer from 'puppeteer';

let browser;

export async function generatePdf(html, options) {
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
      format: 'A4',
      margin: {
        bottom: "13mm",
        top: "13mm",
        left: "15mm",
        right: "15mm",
      },
      printBackground: true,
      scale: 0.8,
      displayHeaderFooter: true,
      headerTemplate: "<div style=\"text-align: right;width: 297mm;font-size: 8px; color: #c44536; margin-top: 0px; font-weight: 500; font-family: Boing;\">Page <span style=\"margin-right: 1cm; font-weight: 500; font-family: Boing;\"><span class=\"pageNumber\"></span> of <span class=\"totalPages\"></span></span></div>",
      footerTemplate: "<div style=\"text-align: center;width: 297mm;font-size: 8px; color: #1f1f1f; opacity: 0.5; font-weight: 400; font-family: Boing; \"><span style=\"font-weight: 500;\">Kcal Management DMCC </span> | TRN 100271929000003 | 1501, Jumeirah Bay X2, JLT Cluster X, Dubai, PO Box 391150</div>",
      ...options,
    });
  } finally {
    await page.close();
  }
}