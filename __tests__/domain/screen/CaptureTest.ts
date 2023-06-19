import { Capture } from "../../../src/domain/screen/Capture";
import { context, $createContext } from "../../../src/application/variable/Context";
import { $setConfig } from "../../../src/application/variable/Config";

describe("CaptureTest", () =>
{
    test("execute test", () =>
    {
        // mock
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            }
        };

        $setConfig(config);
        const capture = new Capture();
        if (context) {
            capture
                .execute()
                .then((result: void) =>
                {
                    expect(result).toBe(undefined);
                });
        } else {
            $createContext(config)
                .then(() =>
                {
                    capture
                        .execute()
                        .then((result: void) =>
                        {
                            expect(result).toBe(undefined);
                        });
                });
        }
    });
});