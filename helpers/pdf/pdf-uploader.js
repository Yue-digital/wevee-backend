import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
async function uploadPdf(dataURI, filename, folder) {
  //upload to cloudinary

  const data = cloudinary.uploader.upload(
    dataURI,
    { public_id: filename, folder }, //set dynamic filename and folder
    function (error, result) {
      console.log(result);
    }
  );

  return data;
}

export { uploadPdf };
