import app from "../../src/app";

describe("'Item' service", () => {
  it("registered the service", () => {
    const service = app.service("item");
    expect(service).toBeTruthy();
  });
});
