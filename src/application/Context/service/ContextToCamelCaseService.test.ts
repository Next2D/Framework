import { execute } from "./ContextToCamelCaseService";
import { describe, expect, it } from "vitest";

describe("ContextToCamelCaseService Test", () =>
{
    it("execute test case1", () =>
    {
        expect(execute("home")).toBe("Home");
    });

    it("execute test case2", () =>
    {
        expect(execute("quest/list")).toBe("QuestList");
    });

    it("execute test case3", () =>
    {
        expect(execute("game/list/page")).toBe("GameListPage");
    });
});