/* eslint-disable linebreak-style */
import { Application } from "../declarations";
import uploadProfileImage from "./upload-profile-image";
import uploadItemImages from "./upload-item-images";
// Don't remove this comment. It's needed to format import lines nicely.
import multer from "multer";
import path from "path";
// import { authenticate } from "@feathersjs/authentication";
const allowedExtentions = [".png", ".jpg"];
//profile images
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/profileImages");
  },
  filename: function (req, file, cb) {
    const fileName = req.query._id + path.extname(file.originalname);
    cb(null, fileName);
  },
});
const upload = multer({
  storage,
  limits: {
    fieldSize: 100,
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (allowedExtentions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});
//images of items
const storage2 = multer.diskStorage({
  destination: function (req: any, file: any, cb: any) {
    cb(null, "public/itemImages");
  },
  filename: function (req: any, file: any, cb: any) {
    const fileName = req.query._id;
    cb(null, fileName);
  },
});
const upload2 = multer({
  storage: storage2,
  limits: {
    fieldSize: 100,
  },
  fileFilter: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    if (allowedExtentions.includes(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Only images are allowed"));
    }
  },
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
export default function (app: Application): void {
  app.post(
    "/uploadProfileImage",
    // authenticate("jwt"),
    upload.single("file"),
    uploadProfileImage()
  );
  app.post(
    "/uploadImagesOfItem",
    // authenticate("jwt"),
    upload2.single("itemImage"),
    uploadItemImages()
  );
  app.get("/profileImages/:id", (req: any, res: any): any => {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, `../../public/profileImages/${id}`));
  });
  app.get("/getItemImage/:id", (req: any, res: any): any => {
    const id = req.params.id;
    res.sendFile(path.join(__dirname, `../../public/itemImages/${id}`));
  });
}
