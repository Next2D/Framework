import { View } from "./View";
import { describe, expect, it } from "vitest";

describe("View Test", () =>
{
    it("initialize call test", () => {
        const view = new View();
        expect(typeof view.initialize).toBe("function");
    });
});