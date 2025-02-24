import { execute } from "./ConfigParserRequestsPropertyService";
import { $setConfig } from "../../variable/Config";
import type { IConfig } from "../../../interface/IConfig";
import { describe, expect, it } from "vitest";

describe("ConfigParserRequestsPropertyService Test", () =>
{
    it("request parse no match test case1", () =>
    {
        // mock
        const config: IConfig = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {}
        };

        $setConfig(config);

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(0);
    });

    it("request parse no match test case2", () =>
    {
        // mock
        const config: IConfig = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "top": {}
            }
        };

        $setConfig(config);

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(0);
    });

    it("request parse match test case1", () =>
    {
        // mock
        const config: IConfig = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "top": {
                    "requests": [
                        {
                            "type": "json",
                            "name": "TopTest",
                            "path": "local"
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        const requests = execute("top");
        expect(requests.length).toBe(1);

        const object = requests[0];
        expect(object.type).toBe("json");
        expect(object.name).toBe("TopTest");
        expect(object.path).toBe("local");
    });

    it("request parse cluster test case1", () =>
    {
        // mock
        const config: IConfig = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "@sample": {
                    "requests": [
                        {
                            "type": "content",
                            "path": "{{ content.endPoint }}content/sample.json",
                            "name": "MainContent",
                            "cache": true
                        }
                    ]
                },
                "top": {
                    "requests": [
                        {
                            "type": "cluster",
                            "path": "@sample"
                        },
                        {
                            "type": "json",
                            "path": "{{ api.endPoint }}api/top.json",
                            "name": "TopText"
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        const requests = execute("top");
        expect(requests.length).toBe(2);

        const object1 = requests[0];
        expect(object1.type).toBe("content");
        expect(object1.name).toBe("MainContent");

        const object2 = requests[1];
        expect(object2.type).toBe("json");
        expect(object2.name).toBe("TopText");
    });
});