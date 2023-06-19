import { CustomRepository } from "../../../src/infrastructure/repository/CustomRepository";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
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

describe("CustomRepository Test", () =>
{
    test("execute public test", () =>
    {
        // mock
        const object: Object = {
            "type": RequestType.CUSTOM,
            "name": "CustomRepository",
            "path": "next2d",
            "method": "publicGet",
            "access": "public",
            "class": "CustomClass"
        };

        const CustomClass = class CustomClass
        {
            publicGet ()
            {
                return "publicGet";
            }
        };

        packages.clear();
        packages.set("CustomClass", CustomClass);

        const customRepository = new CustomRepository();
        customRepository
            .execute(object)
            .then((response) =>
            {
                expect(response).toBe("publicGet");
            });
    });

    test("execute static test", () =>
    {
        // mock

        const object: Object = {
            "type": RequestType.CUSTOM,
            "name": "CustomRepository",
            "path": "next2d",
            "method": "staticGet",
            "access": "static",
            "class": "CustomClass"
        };

        const CustomClass = class CustomClass
        {
            static staticGet ()
            {
                return "staticGet";
            }
        };

        packages.clear();
        packages.set("CustomClass", CustomClass);

        const customRepository = new CustomRepository();
        customRepository
            .execute(object)
            .then((response) =>
            {
                expect(response).toBe("staticGet");
            });
    });

    test("execute not found test", () =>
    {
        // mock
        const object: Object = {
            "type": RequestType.CUSTOM,
            "name": "CustomRepository",
            "path": "next2d",
            "method": "staticGet",
            "access": "static",
            "class": "CustomClass"
        };

        packages.clear();

        const customRepository = new CustomRepository();
        customRepository
            .execute(object)
            .then((response) =>
            {
                expect(response).toBe(null);
            });
    });
});
