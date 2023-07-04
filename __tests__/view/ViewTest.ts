import "@next2d/player";
import { View } from "../../src";

describe("ViewTest", () =>
{
    test("initialize call test", () => {
        const view: View = new View();
        expect(typeof view.initialize).toBe("function");
    });
});