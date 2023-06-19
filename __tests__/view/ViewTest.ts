import "@next2d/player";
import { View } from "../../src/view/View";

describe("ViewTest", () =>
{
    test("initialize call test", () => {
        const view: View = new View();
        expect(typeof view.initialize).toBe("function");
    });
});