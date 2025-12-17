import { S3 } from "aws-sdk";
import { checkBucket } from "./checkBucket";
import { createBucket } from "./createBucket";
import { s3Config } from "../../config/storage";
/**
 * @name initBucket
 * @returns {void}
 */
export const initBucket = async (s3: S3) => {
  const bucketStatus = await checkBucket(s3, s3Config.bucket_name);
  if (!bucketStatus.success) {
    let bucket = await createBucket(s3);
    console.log(bucket.message);
  }
};
