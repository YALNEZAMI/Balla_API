import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "../../declarations";
import fs from "fs";

export class Item extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  async find(params?: any) {
    return super.find(params);
  }
  async remove(id: any, params?: any): Promise<any> {
    console.log("id", id);
    const item = await super.get(id);
    const urls = item.images;
    const images = urls.map((url: string) => url.split("/").pop() as string);
    for (let i = 0; i < images.length; i++) {
      const filePath = `public/itemImages/${images[i]}`;
      fs.access(filePath, fs.constants.F_OK, (err: any) => {
        if (
          err ||
          images[i] === "default_photo.png" ||
          filePath.includes("default")
        ) {
          console.error(`File does not exist: ${filePath}`);
        } else {
          fs.unlink(filePath, (deleteErr: any) => {
            if (deleteErr) {
              console.error(`Error deleting file: ${deleteErr}`);
            } else {
              console.log(`File deleted: ${filePath}`);
            }
          });
        }
      });
    }

    return super.remove(id, params);
  }
}
