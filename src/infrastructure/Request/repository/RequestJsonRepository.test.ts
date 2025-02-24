import type { IRequest } from "../../../interface/IRequest";
import { execute } from "./RequestJsonRepository";
import { describe, expect, it, vi } from "vitest";

describe("RequestJsonRepository Test", () =>
{
    it("execute fetch get test", async () =>
    {
        // mock
        const object: IRequest = {
            "type": "json",
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
        global.fetch = vi.fn().mockImplementation(responseMock);

        const responseDTO = await execute(object);
        expect(responseDTO.name).toBe("JsonRepository");
        expect(responseDTO.response).toBe("success fetch json");
    });

    it("execute fetch post test", async () =>
    {
        // mock
        const object: IRequest = {
            "type": "json",
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
        global.fetch = vi.fn().mockImplementation(responseMock);

        const responseDTO = await execute(object);
        expect(responseDTO.name).toBe("JsonRepository");
        expect(responseDTO.response).toBe("success fetch json");
    });

    it("execute fetch put test", async () =>
    {
        // mock
        const object: IRequest = {
            "type": "json",
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
        global.fetch = vi.fn().mockImplementation(responseMock);

        const responseDTO = await execute(object);
        expect(responseDTO.name).toBe("JsonRepository");
        expect(responseDTO.response).toBe("success fetch json");
    });
});