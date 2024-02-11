// Item-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "item";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const { Schema } = mongooseClient;
  const schema = new Schema(
    {
      ownerId: { type: Schema.Types.ObjectId, ref: "users" },
      title: { type: String, required: true },
      description: { type: String, required: true },
      country: { type: String, required: true },
      region: { type: String, required: true },
      city: { type: String, required: true },
      category: { type: String, required: true },
      price: { type: Number, required: true },
      isNegociablePrice: { type: Boolean, required: true },
      images: { type: [String], required: false },
      likes: { type: [Schema.Types.ObjectId], ref: "users" },
    },
    {
      timestamps: true,
    }
  );

  // This is necessary to avoid model compilation errors in watch mode
  // see https://mongoosejs.com/docs/api/connection.html#connection_Connection-deleteModel
  if (mongooseClient.modelNames().includes(modelName)) {
    (mongooseClient as any).deleteModel(modelName);
  }
  return mongooseClient.model<any>(modelName, schema);
}
