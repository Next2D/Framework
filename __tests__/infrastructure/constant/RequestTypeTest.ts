import { RequestType } from "../../../src/infrastructure/constant/RequestType";

describe("RequestType Test", () =>
{
    test("const check", () =>
    {
        expect(RequestType.CLUSTER).toBe("cluster");
        expect(RequestType.CONTENT).toBe("content");
        expect(RequestType.CUSTOM).toBe("custom");
        expect(RequestType.IMAGE).toBe("image");
        expect(RequestType.JSON).toBe("json");
    });
});
