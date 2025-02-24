import { execute } from "./RequestUseCase";
import { $setPackages, packages } from "../../../application/variable/Packages";
import { cache } from "../../../application/variable/Cache";
import { $setConfig } from "../../../application/variable/Config";
import { describe, expect, it } from "vitest";
import type { IConfig } from "../../../interface/IConfig";

describe("RequestUseCase Test", () =>
{
    it("request test", async () =>
    {
        const TestRepository = {
            "get": () => {
                return "success custom";
            }
        };

        packages.clear();
        packages.set("TestRepository", TestRepository);

        $setPackages(Array.from(packages));

        cache.clear();
        cache.set("JSONRepository", "success json");
        cache.set("ContentRepository", "success content");

        // mock
        const config: IConfig = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "test": {
                    "requests": [
                        {
                            "type": "custom",
                            "class": "TestRepository",
                            "access": "static",
                            "method": "get",
                            "name": "TestRepository"
                        },
                        {
                            "type": "json",
                            "cache": true,
                            "name": "JSONRepository",
                            "path": "sample"
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        const responses = await execute("test");
        expect(responses.length).toBe(2);

        const customResponse = responses[0];
        if (!customResponse) {
            throw new Error("stop test");
        }
        expect(customResponse.name).toBe("TestRepository");
        expect(customResponse.response).toBe("success custom");

        const jsonResponse = responses[1];
        if (!jsonResponse) {
            throw new Error("stop test");
        }
        expect(jsonResponse.name).toBe("JSONRepository");
        expect(jsonResponse.response).toBe("success json");
    });
});
