import { S3 } from "aws-sdk";
import fs  from 'fs';
import { s3Config } from "../../config/storage";

/**
  * @name uploadToS3
  * @param {S3} s3
  * @param {File} fileData
  * @returns {Promise<{success:boolean; message: string; data: object;}>}
*/
export const uploadToS3 = async (s3: S3, fileData?: Express.Multer.File) => {
  try {
    const fileContent = fs.readFileSync(fileData!.path);
    const params = {
      Bucket: s3Config.bucket_name,
      Key: fileData!.originalname,
      Body: fileContent
    };
    try {
      const res = await s3.upload(params).promise();
      console.log("File Uploaded Successfully", res.Location);
      return {success: true, message: "File Uploaded Successfully", data: res.Location};
    } catch (error) {
      return {success: false, message: "Unable to Upload the file", data: error};
    }
  } catch (error) {
    return {success:false, message: "Unalbe to access this file", data: {}};
  }
}