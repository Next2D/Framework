import { RequestParser } from "../../../src/domain/parser/RequestParser";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { $setConfig } from "../../../src/application/variable/Config";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string | string[];
}

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

        const requestParser: RequestParser = new RequestParser();
        const requests: Object[] = requestParser.execute("top");
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

        const requestParser: RequestParser = new RequestParser();
        const requests: Object[] = requestParser.execute("top");
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
                            "type": RequestType.JSON,
                            "name": "TopTest",
                            "path": "local"
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        const requestParser: RequestParser = new RequestParser();
        const requests: Object[] = requestParser.execute("top");
        expect(requests.length).toBe(1);

        const object: Object = requests[0];
        expect(object.type).toBe(RequestType.JSON);
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

        const requestParser: RequestParser = new RequestParser();
        const requests: Object[] = requestParser.execute("top");
        expect(requests.length).toBe(2);

        const object1: Object = requests[0];
        expect(object1.type).toBe(RequestType.CONTENT);
        expect(object1.name).toBe("MainContent");

        const object2: Object = requests[1];
        expect(object2.type).toBe(RequestType.JSON);
        expect(object2.name).toBe("TopText");
    });
});