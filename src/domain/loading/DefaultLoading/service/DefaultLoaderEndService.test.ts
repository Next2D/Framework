import type { Shape } from "@next2d/display";
import type { Job } from "@next2d/ui";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../../application/Context";
import { $setContext } from "../../../../application/variable/Context";
import { $setConfig } from "../../../../application/variable/Config";
import { DefaultLoader } from "../../DefaultLoader";
import { execute } from "./DefaultLoaderEndService";
import { describe, expect, it } from "vitest";

describe("DefaultLoaderEndService Test", () =>
{
    it("execute test", () =>
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
        defaultLoader.start();

        const sprite = defaultLoader.sprite;
        const length = sprite.numChildren;
        for (let idx = 0; idx < length; ++idx) {
            const shape = sprite.getChildAt(idx) as Shape;
            expect(shape.hasLocalVariable("reduceJob")).toBe(true);
            expect(shape.hasLocalVariable("expandJob")).toBe(true);

            const expandJob = shape.getLocalVariable("expandJob") as Job;
            const reduceJob = shape.getLocalVariable("reduceJob") as Job;
            expect(expandJob.stopFlag).toBe(false);
            expect(reduceJob.stopFlag).toBe(false);
        }

        execute(defaultLoader);

        for (let idx = 0; idx < length; ++idx) {
            const shape = sprite.getChildAt(idx) as Shape;
            const expandJob = shape.getLocalVariable("expandJob") as Job;
            const reduceJob = shape.getLocalVariable("reduceJob") as Job;
            expect(expandJob.entries).toBeNull();
            expect(reduceJob.entries).toBeNull();
        }
    });
});