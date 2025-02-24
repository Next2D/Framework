import { execute } from "./DisposeCaptureService";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../../application/Context";
import { $setContext } from "../../../../application/variable/Context";
import { $setConfig } from "../../../../application/variable/Config";
import {
    shape,
    bitmap
} from "../../Capture";
import { describe, expect, it } from "vitest";

describe("DisposeCaptureService Test", () =>
{
    it("execute test", async () =>
    {
        // mock
        $setConfig({
            "platform": "web",
            "spa": false,
            "stage": {
                "width": 800,
                "height": 600,
                "fps": 60
            }
        });

        const root = new MovieClip();
        $setContext(new Context(root));

        root.mouseChildren = false;
        root.addChild(shape);
        root.addChild(bitmap);

        expect(root.numChildren).toBe(2);
        expect(root.mouseChildren).toBe(false);
        execute();
        expect(root.numChildren).toBe(0);
        expect(root.mouseChildren).toBe(true);
    });
});