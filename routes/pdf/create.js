import { orderSummaryTemplate } from "../../helpers/pdf/order-summary-template.js";
import { generatePDF } from "../../helpers/pdf/pdf-generator.js";
import { uploadPdf } from "../../helpers/pdf/pdf-uploader.js";
import authMiddlewares from "../../middlewares/auth.js";
function pdfCreateRouter(router) {
  router.post(
    "/",
    authMiddlewares.authenticatePrefix,
    authMiddlewares.authenticate,
    async (req, res) => {
      try {
        const requestData = req.body;

        // Bind the data into the template
        const summary = orderSummaryTemplate(
          requestData?.user,
          requestData?.orderDetails
        );

        // generate the pdf using puppeeteer
        const pdf = await generatePDF(summary);

        console.log(pdf);

        //convert to dataURI, filetype accepted by cloudinary
        const base64EncodedData = pdf.toString("base64");
        const mimeType = "application/pdf";
        const dataURI = `data:${mimeType};base64,${base64EncodedData}`;

        //add dynamic filename and folder
        const filename = `MATEO_${requestData?.orderDetails?.brand}_${
          requestData?.orderDetails?.model
        }_€${requestData?.orderDetails?.listPrice}_${Date.now()}`;
        const folder = "prefix";

        //upload to cloudinary
        const pdfURl = await uploadPdf(dataURI, filename, folder);

        // Set headers to indicate PDF content
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition", "inline; filename=generated.pdf"); //set dynamic filename

        // Respond with the generated PDF
        res.send(pdfURl);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
  //contract
  router.post(
    "/contract",
    authMiddlewares.authenticatePrefix,
    authMiddlewares.authenticate,
    async (req, res) => {
      try {
        const requestData = req.body;

        // generate the pdf using puppeeteer
        const pdf = await generatePDF(JSON.stringify(req.body));

        //convert to dataURI, filetype accepted by cloudinary
        const base64EncodedData = pdf.toString("base64");
        const mimeType = "application/pdf";
        const dataURI = `data:${mimeType};base64,${base64EncodedData}`;

        //add dynamic filename and folder
        const filename = `MATEO_contract_${Date.now()}`;
        const folder = "prefix";

        //upload to cloudinary
        const pdfURl = await uploadPdf(dataURI, filename, folder);

        // Set headers to indicate PDF content
        // res.setHeader("Content-Type", "application/pdf");
        // res.setHeader("Content-Disposition", "inline; filename=generated.pdf"); //set dynamic filename

        // Respond with the generated PDF
        res.send(pdfURl);
      } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
      }
    }
  );
}

export default pdfCreateRouter;
