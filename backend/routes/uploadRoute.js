import express from "express";
import { uploadPDF } from "../controllers/uploadController/index.js";
import multer from "multer";

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const router = express.Router();

// Route for file upload
router.post("/upload", upload.single("pdf"), uploadPDF);

export default router;
