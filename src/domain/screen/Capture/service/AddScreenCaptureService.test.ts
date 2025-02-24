import { execute } from "./AddScreenCaptureService";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../../application/Context";
import { $setContext } from "../../../../application/variable/Context";
import { $setConfig } from "../../../../application/variable/Config";
import { describe, expect, it, vi } from "vitest";

Object.defineProperty(window, "next2d", {
    "get": vi.fn().mockReturnValue({
        "captureToCanvas": async () => {
            return document.createElement("canvas");
        }
    })
});

describe("AddScreenCaptureService Test", () =>
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

        expect(root.numChildren).toBe(0);
        expect(root.mouseChildren).toBe(true);
        await execute();
        expect(root.numChildren).toBe(2);
        expect(root.mouseChildren).toBe(false);
    });
});