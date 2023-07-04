import "@next2d/player";
import { ToCamelCase } from "../../../src/domain/convert/ToCamelCase";

describe("ToCamelCaseTest", () =>
{
    test("execute test case1", () =>
    {
        const toCamelCase = new ToCamelCase();
        expect(toCamelCase.execute("home")).toBe("Home");
    });

    test("execute test case2", () =>
    {
        const toCamelCase = new ToCamelCase();
        expect(toCamelCase.execute("quest/list")).toBe("QuestList");
    });

    test("execute test case3", () =>
    {
        const toCamelCase = new ToCamelCase();
        expect(toCamelCase.execute("game/list/page")).toBe("GameListPage");
    });
});
