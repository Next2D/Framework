import "@next2d/player";
import { JsonRepository } from "../../../src/infrastructure/repository/JsonRepository";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";

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

describe("JsonRepository Test", () =>
{
    test("execute fetch get test", () =>
    {
        // mock
        const object: Object = {
            "type": RequestType.JSON,
            "name": "JsonRepository",
            "path": "next2d",
            "method": "GET"
        };

        const responseMock = (url: any, options: any) =>
        {

            expect(url).toBe(object.path);
            expect(options.method).toBe(object.method);

            return Promise.resolve({
                "status": 200,
                "json": () => {
                    return Promise.resolve("success fetch json");
                }
            });
        };
        global.fetch = jest.fn().mockImplementation(responseMock);

        const jsonRepository = new JsonRepository();
        jsonRepository.execute(object);
    });

    test("execute fetch post test", () =>
    {
        // mock
        const object: Object = {
            "type": RequestType.JSON,
            "name": "JsonRepository",
            "path": "next2d",
            "method": "POST",
            "body": {
                "sample": 999
            },
            "headers": {
                "Content-Type": "application/json"
            }
        };

        const responseMock = (url: any, options: any) =>
        {

            expect(url).toBe(object.path);
            expect(options.method).toBe(object.method);
            expect(options.body).toBe(JSON.stringify(object.body));
            expect(options.headers["Content-Type"]).toBe("application/json");

            return Promise.resolve({
                "status": 200,
                "json": () => {
                    return Promise.resolve("success fetch json");
                }
            });
        };
        global.fetch = jest.fn().mockImplementation(responseMock);

        const jsonRepository = new JsonRepository();
        jsonRepository.execute(object);
    });

    test("execute fetch put test", () =>
    {
        // mock
        const object: Object = {
            "type": RequestType.JSON,
            "name": "JsonRepository",
            "path": "next2d",
            "method": "PUT",
            "body": {
                "sample": 123
            },
            "headers": {
                "Content-Type": "application/json"
            }
        };

        const responseMock = (url: any, options: any) =>
        {

            expect(url).toBe(object.path);
            expect(options.method).toBe(object.method);
            expect(options.body).toBe(JSON.stringify(object.body));
            expect(options.headers["Content-Type"]).toBe("application/json");

            return Promise.resolve({
                "status": 200,
                "json": () => {
                    return Promise.resolve("success fetch json");
                }
            });
        };
        global.fetch = jest.fn().mockImplementation(responseMock);

        const jsonRepository = new JsonRepository();
        jsonRepository.execute(object);
    });
});