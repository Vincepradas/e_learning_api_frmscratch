import { S3 } from "aws-sdk";
import { CreateBucketRequest } from "aws-sdk/clients/s3";
import { s3Config } from "../../config/storage";

export const createBucket = async (s3: S3) => {
  const params: CreateBucketRequest = {
    Bucket: s3Config.bucket_name,
  };

  if (s3Config.region !== "us-east-1") {
    params.CreateBucketConfiguration = {
      LocationConstraint: s3Config.region,
    };
  }

  try {
    const res = await s3.createBucket(params).promise();
    console.log("Bucket Created Successfully", res.Location);
    return {
      success: true,
      message: "Bucket Created Successfully",
      data: res.Location ?? "",
    };
  } catch (error) {
    console.error("Error: Unable to create bucket", error);
    return {
      success: false,
      message: "Unable to create bucket",
      data: String(error),
    };
  }
};
