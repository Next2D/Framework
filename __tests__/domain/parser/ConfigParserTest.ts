import "@next2d/player";
import { parser } from "../../../src/application/variable/Parser";
import { $setConfig } from "../../../src/application/variable/Config";

describe("ConfigParserTest", () =>
{
    test("parse config test case1", () =>
    {
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {},
            "endPoint": "localhost",
            "v1": "version/1"
        };

        $setConfig(config);

        expect(parser.execute("{{normal")).toBe("{{normal");
    });

    test("parse config test case2", () =>
    {
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {},
            "endPoint": "localhost",
            "v1": "version/1"
        };

        $setConfig(config);

        expect(parser.execute("{{ endPoint }}/{{ v1 }}/test"))
            .toBe("localhost/version/1/test");
    });

    test("parse config test case3", () =>
    {
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {},
            "api": {
                "platform": {
                    "endPoint": "localhost"
                }
            },
            "v1": "version/1"
        };

        $setConfig(config);

        expect(parser.execute("{{ api.platform.endPoint }}/{{ v1 }}/test"))
            .toBe("localhost/version/1/test");
    });

    test("parse config test case4", () =>
    {
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "api": {
                "platform": {
                    "endPoint": "localhost"
                }
            }
        };

        $setConfig(config);

        expect(parser.execute("{{ api.platform.endPoint }}/{{ v1 }}/test"))
            .toBe("localhost/{{ v1 }}/test");
    });

    test("parse config test case5", () =>
    {
        expect(parser.execute()).toBe("");
    });
});