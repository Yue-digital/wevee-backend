import Express from "express";
import pdfCreateRouter from "./create.js";

function PDFRoute(router) {
  const pdfRouter = Express.Router();

  pdfCreateRouter(pdfRouter);
  router.use("/pdf", pdfRouter);
}

export default PDFRoute;
