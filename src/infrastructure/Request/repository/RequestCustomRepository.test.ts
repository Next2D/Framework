import { execute } from "./RequestCustomRepository";
import { packages } from "../../../application/variable/Packages";
import type { IRequest } from "../../../interface/IRequest";
import { describe, expect, it } from "vitest";

describe("RequestCustomRepository Test", () =>
{
    it("execute public test", async () =>
    {
        // mock
        const object: IRequest = {
            "type": "custom",
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

        const responseDTO = await execute(object);
        expect(responseDTO.name).toBe("CustomRepository");
        expect(responseDTO.response).toBe("publicGet");
    });

    it("execute static test", async () =>
    {
        // mock
        const object: IRequest = {
            "type": "custom",
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

        const responseDTO = await execute(object)
        expect(responseDTO.name).toBe("CustomRepository");
        expect(responseDTO.response).toBe("staticGet");
    });
});
