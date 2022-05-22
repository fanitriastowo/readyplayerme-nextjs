import { getAccessToken } from "@/utils";

describe("getAccessToken()", () => {
  it("returns string", () => {
    expect(getAccessToken()).toBe("");
  });
});
