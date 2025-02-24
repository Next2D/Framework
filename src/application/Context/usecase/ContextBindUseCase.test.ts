import { execute } from "./ContextBindUseCase";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../application/Context";
import { $setContext } from "../../../application/variable/Context";
import { $setConfig } from "../../../application/variable/Config";
import { packages } from "../../../application/variable/Packages";
import { View } from "../../../view/View";
import { ViewModel } from "../../../view/ViewModel";
import { describe, expect, it } from "vitest";

describe("ContextBindUseCase Test", () =>
{
    it("execute test case1", async () =>
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

        let state = "none";
        class TestViewModel extends ViewModel
        {
            async bind ()
            {
                state = "bind";
            }
        }

        packages.clear();
        packages.set("TestView", View);
        packages.set("TestViewModel", TestViewModel);

        const root = new MovieClip();
        const context = new Context(root);
        $setContext(context);

        expect(state).toBe("none");
        expect(root.numChildren).toBe(0);

        await execute(context, "test");

        expect(state).toBe("bind");
        expect(root.numChildren).toBe(1);
    });
});