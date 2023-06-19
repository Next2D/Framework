import "@next2d/player";
import { ContentRepository } from "../../../src/infrastructure/repository/ContentRepository";
import { RequestType } from "../../../src/infrastructure/constant/RequestType";
import { cache } from "../../../src";
import { loaderInfoMap } from "../../../src";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    callback?: string|string[];
    method?: string;
    body?: object;
    headers?: HeadersInit;
}

describe("ContentRepository Test", () =>
{
    test("execute json content test", () =>
    {
        // reset
        cache.clear();
        loaderInfoMap.clear();

        const object: Object = {
            "type": RequestType.CONTENT,
            "name": "ContentRepository",
            "path": "",
            "method": "GET",
            "body": {
                "sample": 12345
            },
            "headers": {
                "Content-Type": "application/json"
            }
        };

        expect(cache.size).toBe(0);
        expect(loaderInfoMap.size).toBe(0);

        const contentRepository = new ContentRepository();
        contentRepository
            .execute(object)
            .then((response: any) =>
            {
                if (!response) {
                    throw new Error("stop test");
                }

                expect(response.text).toBe("NoCode Tool content");
            });
    });
});