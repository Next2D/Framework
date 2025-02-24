import { execute } from "./CallbackService";
import { packages } from "../../../application/variable/Packages";
import { describe, expect, it } from "vitest";

describe("CallbackService Test", () =>
{
    it("execute test case1", async () =>
    {
        const result = await execute()
        expect(result).toBe(undefined);
    });

    it("execute single test", async () =>
    {
        // mock
        let state = "none";
        const SingleTest = class SingleTest
        {
            execute (value: any): any
            {
                state = value;
            }
        };

        packages.clear();
        packages.set("SingleTest", SingleTest);

        expect(state).toBe("none");
        await execute("SingleTest", "single test");
        expect(state).toBe("single test");
    });

    it("execute multiple test", async () =>
    {
        // mock
        let state1 = "none";
        const MultipleTestCase1 = class MultipleTest
        {
            execute (value: any): any
            {
                state1 = `${value}_1`;
            }
        };

        let state2 = "none";
        const MultipleTestCase2 = class MultipleTest
        {
            execute (value: any): any
            {
                state2 = `${value}_2`;
            }
        };

        packages.clear();
        packages.set("multiple.test.case1", MultipleTestCase1);
        packages.set("multiple.test.case2", MultipleTestCase2);

        expect(state1).toBe("none");
        expect(state2).toBe("none");

        await execute(["multiple.test.case1", "multiple.test.case2"], "multiple test")

        expect(state1).toBe("multiple test_1");
        expect(state2).toBe("multiple test_2");
    });
});