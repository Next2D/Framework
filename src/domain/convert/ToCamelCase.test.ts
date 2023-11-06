import { execute } from "./ToCamelCase";

describe("ToCamelCaseTest", () =>
{
    test("execute test case1", () =>
    {
        expect(execute("home")).toBe("Home");
    });

    test("execute test case2", () =>
    {
        expect(execute("quest/list")).toBe("QuestList");
    });

    test("execute test case3", () =>
    {
        expect(execute("game/list/page")).toBe("GameListPage");
    });
});