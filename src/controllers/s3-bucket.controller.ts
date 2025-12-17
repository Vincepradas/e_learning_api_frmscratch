import { initBucket } from "../services/aws-s3/index";
import { S3 } from "aws-sdk";
import { Request } from "express";
import { uploadToS3 } from "../services/aws-s3/s3Upload";
import { s3Config } from "../config/storage";

export class UploadController {
  static Upload = async (req: Request, res: any) => {
    const s3 = new S3({ 
      accessKeyId: s3Config.aws_access_key_id,
      secretAccessKey: s3Config.aws_secret_access_key,
    });
    await initBucket(s3);
    console.log("file stobject", req.file);

    const uplaodRes = await uploadToS3(s3, req.file);

    if (uplaodRes.success) {
      res.status(200).json(uplaodRes);
    } else {
      res.status(400).json(uplaodRes);
    }
  };
}
