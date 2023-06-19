import { CustomService } from "../../../src/infrastructure/service/CustomService";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { ResponseDTO } from "../../../src/infrastructure/dto/ResponseDTO";
import { cache } from "../../../src/application/variable/Cache";
import { packages } from "../../../src/application/variable/Packages";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string|string[];
    body?: object;
    headers?: HeadersInit;
}

describe("CustomService Test", () =>
{
    test("execute load test use cache", () =>
    {
        // mock
        cache.clear();

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success custom");
                }
            };
        };

        packages.clear();
        packages.set("TestCallback", TestCallback);

        const TestRepository = {
            "get": () => {
                return "success custom";
            }
        };

        packages.set("TestRepository", TestRepository);

        const customService = new CustomService();

        const object: Object = {
            "type": RequestType.CUSTOM,
            "class": "TestRepository",
            "access": "static",
            "method": "get",
            "name": "CustomRepository",
            "callback": "TestCallback",
            "path": "",
            "cache": true
        };

        expect(cache.size).toBe(0);

        customService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("CustomRepository");
                expect(response.response).toBe("success custom");
                expect(cache.size).toBe(1);
                expect(cache.get("CustomRepository")).toBe("success custom");
            });
    });

    test("execute load test no use cache", () =>
    {
        // mock
        cache.clear();

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success custom");
                }
            };
        };

        packages.clear();
        packages.set("TestCallback", TestCallback);

        const TestRepository = {
            "get": () => {
                return "success custom";
            }
        };

        packages.set("TestRepository", TestRepository);

        const customService = new CustomService();

        const object: Object = {
            "type": RequestType.CUSTOM,
            "class": "TestRepository",
            "access": "static",
            "method": "get",
            "name": "CustomRepository",
            "callback": "TestCallback",
            "path": ""
        };

        expect(cache.size).toBe(0);

        customService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("CustomRepository");
                expect(response.response).toBe("success custom");
                expect(cache.size).toBe(0);
            });
    });

    test("execute cache test", () =>
    {
        // mock
        cache.set("CustomRepository", "success cache custom");

        const TestCallback = function ()
        {
            return {
                "execute": (value: any) => {
                    expect(value).toBe("success cache custom");
                }
            };
        };

        packages.clear();
        packages.set("TestCallback", TestCallback);

        const TestRepository = {
            "get": () => {
                return "success custom";
            }
        };

        packages.set("TestRepository", TestRepository);

        const customService = new CustomService();

        const object: Object = {
            "type": RequestType.CUSTOM,
            "class": "TestRepository",
            "access": "static",
            "method": "get",
            "name": "CustomRepository",
            "callback": "TestCallback",
            "cache": true,
            "path": ""
        };

        customService
            .execute(object)
            .then((response: ResponseDTO|void) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.name).toBe("CustomRepository");
                expect(response.response).toBe("success cache custom");
            });
    });
});