import { execute } from "./RequestParser";
import { $setConfig } from "../../../src/application/variable/Config";

describe("RequestParserTest", () =>
{
    test("request parse no match test case1", () =>
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
            },
            "routing": {}
        };

        $setConfig(config);

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(0);
    });

    test("request parse no match test case2", () =>
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
            },
            "routing": {
                "top": {}
            }
        };

        $setConfig(config);

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(0);
    });

    test("request parse match test case1", () =>
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

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(1);

        const object: Object = requests[0];
        expect(object.type).toBe("json");
        expect(object.name).toBe("TopTest");
        expect(object.path).toBe("local");
    });

    test("request parse cluster test case1", () =>
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

        const requests: Object[] = execute("top");
        expect(requests.length).toBe(2);

        const object1: Object = requests[0];
        expect(object1.type).toBe("content");
        expect(object1.name).toBe("MainContent");

        const object2: Object = requests[1];
        expect(object2.type).toBe("json");
        expect(object2.name).toBe("TopText");
    });
});