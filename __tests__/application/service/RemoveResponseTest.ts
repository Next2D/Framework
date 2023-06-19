import { loaderInfoMap } from "../../../src/application/variable/LoaderInfoMap";
import { response } from "../../../src/application/variable/Response";
import { RemoveResponse } from "../../../src/application/service/RemoveResponse";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { $setConfig } from "../../../src/application/variable/Config";

describe("RemoveResponseTest", () =>
{
    test("execute test", () =>
    {
        // mock
        loaderInfoMap.clear();
        // @ts-ignore
        loaderInfoMap.set("symbol_1", "abc");
        // @ts-ignore
        loaderInfoMap.set("symbol_2", "xyz");
        // @ts-ignore
        loaderInfoMap.set("symbol_3", "cache data");
        expect(loaderInfoMap.size).toBe(3);
        expect(loaderInfoMap.get("symbol_1")).toBe("abc");
        expect(loaderInfoMap.get("symbol_2")).toBe("xyz");
        expect(loaderInfoMap.get("symbol_3")).toBe("cache data");

        // mock
        const symbols = new Map();
        symbols.set("symbol_1", true);

        response.clear();
        response.set("test1", {
            "_$loaderInfo": {
                "_$data": {
                    "symbols": symbols
                }
            }
        });
        response.set("test2", []);
        expect(response.size).toBe(2);

        // mock
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "test": {
                    "requests": [
                        {
                            "type": RequestType.CONTENT,
                            "name": "test1"
                        },
                        {
                            "type": RequestType.JSON,
                            "name": "test2"
                        },
                        {
                            "type": RequestType.CONTENT,
                            "name": "test3",
                            "cache": true
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        // execute
        new RemoveResponse().execute("test");

        // test
        expect(response.size).toBe(0);
        expect(loaderInfoMap.size).toBe(2);
        expect(loaderInfoMap.has("symbol_1")).toBe(false);
        expect(loaderInfoMap.has("symbol_2")).toBe(true);
        expect(loaderInfoMap.has("symbol_3")).toBe(true);
    });
});