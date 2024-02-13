import { describe, expect, it } from "vitest";
import app from "./index";

describe("The Ampt Tutorial app", () => {
  it("should render jsx at root", async () => {
    const res = await app.request("/");
    const response = await res.text();

    expect(res.status).toBe(200);
    expect(response).toContain("Ampt Tutorial");
    expect(response.startsWith("<html>")).toBe(true);
  });
});
