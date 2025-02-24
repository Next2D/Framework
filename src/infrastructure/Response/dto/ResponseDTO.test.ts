import { ResponseDTO } from "./ResponseDTO";
import { describe, expect, it } from "vitest";

describe("ResponseDTOTest", () =>
{
    it("execute test case1", () =>
    {
        const responseDTO = new ResponseDTO();
        expect(responseDTO.name).toBe("");
        expect(responseDTO.response).toBe(null);
    });

    it("execute test case2", () =>
    {
        const responseDTO = new ResponseDTO("sample", 100);
        expect(responseDTO.name).toBe("sample");
        expect(responseDTO.response).toBe(100);
    });
});