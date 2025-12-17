import express from "express";
import multer from "multer";
import { UploadController } from "../controllers/s3-bucket.controller";
import { multerConfig } from "../config/multer";

const router = express.Router();
const upload = multer(multerConfig);

router.post("/upload", upload.single("file"), UploadController.Upload);

export default router;
