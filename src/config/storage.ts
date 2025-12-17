import * as dotenv from "dotenv";
dotenv.config();

export const s3Config: {
  port: number;
  aws_access_key_id: string;
  aws_secret_access_key: string;
  bucket_name: string;
  region: string;
} = {
  port: Number(process.env.PORT) ?? 3000,
  aws_access_key_id: process.env.AWS_ACCESS_KEY_ID ?? " ",
  aws_secret_access_key: process.env.AWS_SECRET_ACCESS_KEY ?? "",
  bucket_name: process.env.BUCKET_NAME ?? "", 
  region: process.env.REGION ?? ""
};
