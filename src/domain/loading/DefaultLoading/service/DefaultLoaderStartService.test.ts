import type { Shape } from "@next2d/display";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../../application/Context";
import { $setContext } from "../../../../application/variable/Context";
import { $setConfig } from "../../../../application/variable/Config";
import { DefaultLoader } from "../../DefaultLoader";
import { execute } from "./DefaultLoaderStartService";
import { describe, expect, it } from "vitest";

describe("DefaultLoaderStartService Test", () =>
{
    it("execute test", async () =>
    {
        $setConfig({
            "platform": "web",
            "spa": false,
            "stage": {
                "width": 800,
                "height": 600,
                "fps": 60
            }
        });
        $setContext(new Context(new MovieClip()));

        // mock
        const defaultLoader = new DefaultLoader();

        const sprite = defaultLoader.sprite;
        const length = sprite.numChildren;
        for (let idx = 0; idx < length; ++idx) {
            const shape = sprite.getChildAt(idx) as Shape;
            expect(shape.hasLocalVariable("reduceJob")).toBe(false);
            expect(shape.hasLocalVariable("expandJob")).toBe(false);
        }

        execute(defaultLoader);

        for (let idx = 0; idx < length; ++idx) {
            const shape = sprite.getChildAt(idx) as Shape;
            expect(shape.hasLocalVariable("reduceJob")).toBe(true);
            expect(shape.hasLocalVariable("expandJob")).toBe(true);
        }
    });
});