import { execute } from "./LoadingStartService";
import { MovieClip } from "@next2d/display";
import { Context } from "../../../../application/Context";
import { $setContext } from "../../../../application/variable/Context";
import { $setConfig } from "../../../../application/variable/Config";
import { packages } from "../../../../application/variable/Packages";
import {
    $getInstance,
    $setInstance
} from "../../Loading";
import { describe, expect, it } from "vitest";

describe("LoadingStartService Test", () =>
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
            },
            "loading": {
                "callback": "Loader"
            }
        });

        const root = new MovieClip();
        $setContext(new Context(root));

        $setInstance(null);
        expect($getInstance()).toBeNull();
        await execute();
        expect($getInstance()).not.toBeNull();
    });

    it("execute test case2", async () =>
    {
        // mock
        $setConfig({
            "platform": "web",
            "spa": false,
            "stage": {
                "width": 800,
                "height": 600,
                "fps": 60
            },
            "loading": {
                "callback": "LoaderTest"
            }
        });

        let state = "none";
        class LoaderTest {
            start (): void {
                state = "start"; 
            }
        }

        packages.clear();
        packages.set("LoaderTest", LoaderTest);

        $setInstance(null);
        expect(state).toBe("none");
        await execute();
        expect(state).toBe("start");
    });
});