import { execute } from "./LoadingEndService";
import { $setConfig } from "../../../../application/variable/Config";
import { packages } from "../../../../application/variable/Packages";
import { $setInstance } from "../../Loading";
import { describe, expect, it } from "vitest";

describe("LoadingEndService Test", () =>
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
            },
            "loading": {
                "callback": "LoaderTest"
            }
        });

        let state = "none";
        class LoaderTest {
            end (): void {
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