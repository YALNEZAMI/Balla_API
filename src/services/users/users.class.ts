import { Service, MongooseServiceOptions } from "feathers-mongoose";
import { Application } from "../../declarations";

export class Users extends Service {
  //eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(options: Partial<MongooseServiceOptions>, app: Application) {
    super(options);
  }

  //create function
  async create(data: any, params?: any) {
    const user = {
      email: data.email,
      password: data.password,
      name: data.name,
      number: data.number,
    };
    // Call the original `create` method with existing `params` and new data
    return super.create(user, params);
  }
}
