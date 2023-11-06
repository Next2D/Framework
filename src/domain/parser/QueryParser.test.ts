import { execute } from "./QueryParser";
import { query } from "../../application/variable/Query";
import { $setConfig } from "../../application/variable/Config";
import { QueryObjectImpl } from "../../interface/QueryObjectImpl";
import { vi } from "vitest";

Object.defineProperty(window, "location", {
    "get": vi.fn().mockReturnValue({
        "search": "",
        "pathname": ""
    })
});

describe("QueryParserTest", () =>
{
    test("parse query test case1", () =>
    {
        query.clear();
        query.set("test", 123);
        expect(query.size).toBe(1);

        const object: QueryObjectImpl = execute();

        expect(query.size).toBe(0);
        expect(object.name).toBe("top");
        expect(object.queryString).toBe("");
    });

    test("parse query test case2", () =>
    {
        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("@test");

        expect(query.size).toBe(0);
        expect(object.name).toBe("test");
        expect(object.queryString).toBe("");
    });

    test("parse location.search test case1", () =>
    {
        // @ts-ignore
        globalThis.location.search = "?q=abc&sample=1";

        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("");

        expect(query.size).toBe(2);
        expect(query.get("q")).toBe("abc");
        expect(query.get("sample")).toBe("1");
        expect(object.name).toBe("top");
        expect(object.queryString).toBe("?q=abc&sample=1");
    });

    test("parse location.pathname un match test", () =>
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

        // @ts-ignore
        globalThis.location.pathname = "/quest/list";

        // @ts-ignore
        globalThis.location.search   = "?q=xyz&sample=0";

        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("");

        expect(query.size).toBe(2);
        expect(query.get("q")).toBe("xyz");
        expect(query.get("sample")).toBe("0");
        expect(object.name).toBe("top");
        expect(object.queryString).toBe("?q=xyz&sample=0");
    });

    test("parse location.pathname public test", () =>
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
                "quest/list": {
                    "private": false
                }
            }
        };

        $setConfig(config);

        // @ts-ignore
        globalThis.location.pathname = "/quest/list";

        // @ts-ignore
        globalThis.location.search   = "?q=xyz&sample=0";

        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("");

        expect(query.size).toBe(2);
        expect(query.get("q")).toBe("xyz");
        expect(query.get("sample")).toBe("0");
        expect(object.name).toBe("quest/list");
        expect(object.queryString).toBe("?q=xyz&sample=0");
    });

    test("parse location.pathname private test", () =>
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
                "quest/list": {
                    "private": true
                }
            }
        };

        $setConfig(config);

        // @ts-ignore
        globalThis.location.pathname = "/quest/list";

        // @ts-ignore
        globalThis.location.search   = "?q=xyz&sample=0";

        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("");

        expect(query.size).toBe(2);
        expect(query.get("q")).toBe("xyz");
        expect(query.get("sample")).toBe("0");
        expect(object.name).toBe("top");
        expect(object.queryString).toBe("?q=xyz&sample=0");
    });

    test("parse location.pathname redirect test", () =>
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
                "quest/list": {
                    "private": true,
                    "redirect": "quest/detail"
                }
            }
        };

        $setConfig(config);

        // @ts-ignore
        globalThis.location.pathname = "/quest/list";

        // @ts-ignore
        globalThis.location.search   = "?q=xyz&sample=0";

        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("");

        expect(query.size).toBe(2);
        expect(query.get("q")).toBe("xyz");
        expect(query.get("sample")).toBe("0");
        expect(object.name).toBe("quest/detail");
        expect(object.queryString).toBe("?q=xyz&sample=0");
    });

    test("parse name query test", () =>
    {
        // mock
        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("page/test?abc=123&xyz=999");

        expect(query.size).toBe(2);
        expect(query.get("abc")).toBe("123");
        expect(query.get("xyz")).toBe("999");
        expect(object.name).toBe("page/test");
        expect(object.queryString).toBe("?abc=123&xyz=999");
    });

    test("parse name path test case1", () =>
    {
        // mock
        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("./test");

        expect(query.size).toBe(0);
        expect(object.name).toBe("test");
    });

    test("parse name path test case2", () =>
    {
        // mock
        query.clear();
        expect(query.size).toBe(0);

        const object: QueryObjectImpl = execute("./");

        expect(query.size).toBe(0);
        expect(object.name).toBe("top");
    });
});