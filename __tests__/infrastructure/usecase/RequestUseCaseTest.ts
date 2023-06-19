import "@next2d/player";
import { RequestUseCase } from "../../../src/infrastructure/usecase/RequestUseCase";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { ResponseDTO } from "../../../src/infrastructure/dto/ResponseDTO";
import { $setPackages } from "../../../src/application/variable/Packages";
import { $setConfig } from "../../../src/application/variable/Config";
import { cache } from "../../../src/application/variable/Cache";
import { packages } from "../../../src/application/variable/Packages";

describe("RequestUseCase Test", () =>
{
    test("request test", () =>
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
                "test": {
                    "requests": [
                        {
                            "type": RequestType.CUSTOM,
                            "class": "TestRepository",
                            "access": "static",
                            "method": "get",
                            "name": "TestRepository"
                        },
                        {
                            "type": RequestType.JSON,
                            "cache": true,
                            "name": "JSONRepository"
                        },
                        {
                            "type": RequestType.CONTENT,
                            "cache": true,
                            "name": "ContentRepository"
                        }
                    ]
                }
            }
        };

        $setConfig(config);

        const requestUseCase: RequestUseCase = new RequestUseCase();
        const promises = requestUseCase.execute("test");

        Promise
            .all(promises)
            .then((responses) =>
            {
                expect(responses.length).toBe(3);

                const customResponse: ResponseDTO|void = responses[0];
                if (!customResponse) {
                    throw new Error("stop test");
                }
                expect(customResponse.name).toBe("TestRepository");
                expect(customResponse.response).toBe("success custom");

                const jsonResponse: ResponseDTO|void = responses[1];
                if (!jsonResponse) {
                    throw new Error("stop test");
                }
                expect(jsonResponse.name).toBe("JSONRepository");
                expect(jsonResponse.response).toBe("success json");

                const contentResponse: ResponseDTO|void = responses[2];
                if (!contentResponse) {
                    throw new Error("stop test");
                }
                expect(contentResponse.name).toBe("ContentRepository");
                expect(contentResponse.response).toBe("success content");
            });
    });
});
