import { S3 } from "aws-sdk";

export const checkBucket = async (s3: S3, bucket: string) => {
  try {
    await s3.headBucket({ Bucket: bucket }).promise();


    console.log("Bucket exists and is accessible");
    return {
      success: true,
      message: "Bucket exists",
      data: {},
    };
  } catch (error: any) {
    const status = error?.statusCode;

    if (status === 404) {
      console.log("Bucket does not exist");
      return {
        success: false,
        message: "Bucket does not exist",
        data: {},
      };
    }

    if (status === 403) {
      console.error("Bucket exists but access is forbidden");
      throw new Error(
        "Bucket exists but access is forbidden. Check bucket name, region, or IAM permissions."
      );
    }

    console.error("Unexpected S3 error", error);
    throw error;
  }
};
