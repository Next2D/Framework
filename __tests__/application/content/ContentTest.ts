import "@next2d/player";
import { Content } from "../../../src/application/content/Content";

describe("ContentTest", () =>
{
    test("initialize test", () => {
        const content = new Content();
        expect(content.initialize()).toBe(undefined);
    });
});