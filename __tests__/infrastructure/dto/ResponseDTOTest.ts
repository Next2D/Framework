import "@next2d/player";
import { ResponseDTO } from "../../../src/infrastructure/dto/ResponseDTO";

describe("ResponseDTO Test", () =>
{
    test("property check case1", () =>
    {
        const responseDTO: ResponseDTO = new ResponseDTO("string", "any");
        expect(responseDTO.name).toBe("string");
        expect(responseDTO.response).toBe("any");
    });

    test("property check case2", () =>
    {
        const responseDTO: ResponseDTO = new ResponseDTO();
        expect(responseDTO.name).toBe("");
        expect(responseDTO.response).toBe(null);
    });
});
