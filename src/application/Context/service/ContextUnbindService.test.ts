import type { ViewModel } from "../../../view/ViewModel";
import { execute } from "./ContextUnbindService";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../application/Context";
import { $setContext } from "../../../application/variable/Context";
import { $setConfig } from "../../../application/variable/Config";
import { View } from "../../../view/View";
import { describe, expect, it } from "vitest";

describe("ContextUnbindService Test", () =>
{
    it("execute test case", async () =>
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
        const context = new Context(root);
        $setContext(context);

        let state = "none";
        context.view = new View();
        root.addChild(context.view);
        context.viewModel = {
            "unbind": (view: View) =>
            {
                state = "unbind";
            }
        } as ViewModel;
        
        expect(state).toBe("none");
        expect(root.numChildren).toBe(1);

        await execute(context);

        expect(state).toBe("unbind");
        expect(root.numChildren).toBe(0);
    });
});