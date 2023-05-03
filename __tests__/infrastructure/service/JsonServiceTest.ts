import { JsonService } from "../../../src/infrastructure/service/JsonService";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { ConfigParser } from "../../../src/domain/parser/ConfigParser";
import { ResponseDTO } from "../../../src/infrastructure/dto/ResponseDTO";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    callback?: string | string[];
    method?: string;
    body?: object;
    headers?: HeadersInit;
}

describe("JsonService Test", () =>
{
    test("execute fetch test use cache", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        const cache: Map<string, any> = new Map();
        cache.clear();

        // @ts-ignore
        next2d.fw.cache = cache;

        const packages: Map<string, any> = new Map();

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success fetch json");
                }
            };
        };

        packages.set("TestCallback_Case1", TestCallback);

        // @ts-ignore
        next2d.fw.packages = packages;

        const jsonService = new JsonService();

        const object: Object = {
            "type": RequestType.JSON,
            "name": "JSONRepository",
            "cache": true,
            "path": "",
            "callback": "TestCallback_Case1"
        };

        const responseMock = () => Promise.resolve({
            "status": 200,
            "json": () => {
                return Promise.resolve("success fetch json");
            }
        });
        global.fetch = jest.fn().mockImplementation(responseMock);

        expect(cache.size).toBe(0);

        jsonService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("JSONRepository");
                expect(response.response).toBe("success fetch json");
                expect(cache.size).toBe(1);
                expect(cache.get("JSONRepository")).toBe("success fetch json");
            });
    });

    test("execute fetch test no use cache", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        const cache: Map<string, any> = new Map();
        cache.clear();

        // @ts-ignore
        next2d.fw.cache = cache;

        const packages: Map<string, any> = new Map();

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success fetch json");
                }
            };
        };

        packages.set("TestCallback_Case1", TestCallback);

        // @ts-ignore
        next2d.fw.packages = packages;

        const jsonService = new JsonService();

        const object: Object = {
            "type": RequestType.JSON,
            "name": "JSONRepository",
            "path": "",
            "callback": "TestCallback_Case1"
        };

        const responseMock = () => Promise.resolve({
            "status": 200,
            "json": () => {
                return Promise.resolve("success fetch json");
            }
        });
        global.fetch = jest.fn().mockImplementation(responseMock);

        expect(cache.size).toBe(0);

        jsonService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("JSONRepository");
                expect(response.response).toBe("success fetch json");
                expect(cache.size).toBe(0);
            });
    });

    test("execute cache test", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        const cache: Map<string, any> = new Map();
        cache.set("JSONRepository", "success cache json");

        // @ts-ignore
        next2d.fw.cache = cache;

        const packages: Map<string, any> = new Map();

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success cache json");
                }
            };
        };

        packages.set("TestCallback_Case2", TestCallback);

        const jsonService = new JsonService();

        const object: Object = {
            "type": RequestType.JSON,
            "name": "JSONRepository",
            "cache": true,
            "callback": "TestCallback_Case2",
            "path": ""
        };

        const responseMock = () => Promise.resolve({
            "status": 200,
            "json": () => {
                return {
                    "result": "success json"
                };
            }
        });
        global.fetch = jest.fn().mockImplementation(responseMock);

        jsonService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("JSONRepository");
                expect(response.response).toBe("success cache json");
            });
    });
});