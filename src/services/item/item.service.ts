// Initializes the `Item` service on path `/item`
import { ServiceAddons } from "@feathersjs/feathers";
import { Application } from "../../declarations";
import { Item } from "./item.class";
import createModel from "../../models/item.model";
import hooks from "./item.hooks";

// Add this service to the service type index
declare module "../../declarations" {
  interface ServiceTypes {
    "item": Item & ServiceAddons<any>;
  }
}

export default function (app: Application): void {
  const options = {
    Model: createModel(app),
    paginate: app.get("paginate")
  };

  // Initialize our service with any options it requires
  app.use("/item", new Item(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service("item");

  service.hooks(hooks);
}
