import { Request, Response, NextFunction } from "express";
import fs from "fs";
import path from "path";
//delete file
export default () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return (req: Request, res: Response, next: NextFunction) => {
    const oldName = req.query.oldImg;
    const id = req.query._id;
    const newName = `${id}` + path.extname(req.file?.originalname as string);
    const filePath = `public/profileImages/${oldName}`;

    // Check if the file exists
    fs.access(filePath, fs.constants.F_OK, (err: any) => {
      if (
        err ||
        oldName === "default_photo.png" ||
        filePath.includes("default")
      ) {
        // console.error(`File does not exist: ${filePath}`);
      } else {
        // File exists, proceed with deletion
        fs.unlink(filePath, (deleteErr: any) => {
          if (deleteErr) {
            console.error(`Error deleting file: ${deleteErr}`);
          } else {
            console.log(`File deleted: ${filePath}`);
          }
        });
      }
    });

    res.json({
      message: "Image uploaded successfully",
      imageUrl: `${process.env.API}/profileImages/${newName}`,
    });
    next();
  };
};
