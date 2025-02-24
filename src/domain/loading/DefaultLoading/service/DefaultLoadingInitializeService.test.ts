import type { DefaultLoader } from "../../DefaultLoader";
import { execute } from "./DefaultLoadingInitializeService";
import { Sprite } from "@next2d/display";
import { describe, expect, it } from "vitest";

describe("DefaultLoadingInitializeService Test", () =>
{
    it("execute test", async () =>
    {
        // mock
        const defaultLoader = {
            "sprite": new Sprite(),
        } as DefaultLoader;

        expect(defaultLoader.sprite.numChildren).toBe(0);
        execute(defaultLoader);
        expect(defaultLoader.sprite.numChildren).toBe(3);
    });
});