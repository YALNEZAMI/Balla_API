// users-model.ts - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
import { Application } from "../declarations";
import { Model, Mongoose } from "mongoose";

export default function (app: Application): Model<any> {
  const modelName = "users";
  const mongooseClient: Mongoose = app.get("mongooseClient");
  const schema = new mongooseClient.Schema(
    {
      email: { type: String, unique: true, lowercase: true },
      password: { type: String },
      name: { type: String },
      number: { type: Number, require: true },
      imageUrl: {
        type: String,
        default: process.env.API + "/profileImages/default_user.png",
      },

      auth0Id: { type: String },

      googleId: { type: String },

      facebookId: { type: String },

      twitterId: { type: String },

      githubId: { type: String },
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
