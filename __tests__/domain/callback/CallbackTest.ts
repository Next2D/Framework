import { Callback } from "../../../src/domain/callback/Callback";
import { packages } from "../../../src/application/variable/Packages";

describe("CallbackTest", () =>
{
    test("execute test case1", () =>
    {
        const callback = new Callback();
        callback
            .execute()
            .then((result) =>
            {
                expect(result).toBe(undefined);
            });
    });

    test("execute single test", () =>
    {
        // mock
        const SingleTest = class SingleTest
        {
            execute (value: any): any
            {
                return value;
            }
        };

        packages.clear();
        packages.set("SingleTest", SingleTest);

        const callback = new Callback();
        callback
            .execute("SingleTest", "single test")
            .then((results: string[] | void) =>
            {
                if (!results) {
                    throw new Error("stop test");
                }

                expect(results.length).toBe(1);
                const result: string = results[0];
                expect(result).toBe("single test");
            });
    });

    test("execute multiple test", () =>
    {
        // mock
        const MultipleTestCase1 = class MultipleTest
        {
            execute (value: any): any
            {
                return `${value}_1`;
            }
        };

        const MultipleTestCase2 = class MultipleTest
        {
            execute (value: any): any
            {
                return `${value}_2`;
            }
        };

        packages.clear();
        packages.set("multiple.test.case1", MultipleTestCase1);
        packages.set("multiple.test.case2", MultipleTestCase2);

        const callback = new Callback();
        callback
            .execute(["multiple.test.case1", "multiple.test.case2"], "multiple test")
            .then((results: string[] | void) =>
            {
                if (!results) {
                    throw new Error("stop test");
                }

                expect(results.length).toBe(2);
                const result1: string = results[0];
                expect(result1).toBe("multiple test_1");

                const result2: string = results[1];
                expect(result2).toBe("multiple test_2");
            });
    });
});