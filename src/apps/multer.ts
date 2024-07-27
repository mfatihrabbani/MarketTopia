import multer from "multer";
import path from "path";
import { v4 as uuid } from "uuid";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./static");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${uuid()}-${path.extname(file.originalname)}`;
    cb(null, uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

// export const upload = multer({ dest: "./static" });
