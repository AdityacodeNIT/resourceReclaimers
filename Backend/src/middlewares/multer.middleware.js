import multer from "multer";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the directory path
const tempDirectory = path.join(__dirname, "public/temp");
if (!fs.existsSync(tempDirectory)) {
        fs.mkdirSync(tempDirectory, { recursive: true });
}

const storage = multer.diskStorage({
        destination: function (req, file, cb) {
                cb(null, tempDirectory);
        },

        filename: function (req, file, cb) {
                // Generate a unique filename
                const uniqueSuffix =
                        Date.now() + "-" + Math.round(Math.random() * 1e9);
                const originalName = file.originalname;
                const uniqueName = `${uniqueSuffix}-${originalName}`;

                cb(null, uniqueName);
        },
});

export const upload = multer({ storage });
