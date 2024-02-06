import app from "../../src/app";

describe("'profileImages' service", () => {
  it("registered the service", () => {
    const service = app.service("profile-images");
    expect(service).toBeTruthy();
  });
});
