import { Loading } from "../../../src/domain/loading/Loading";
import { ConfigParser } from "../../../src/domain/parser/ConfigParser";

describe("LoadingTest", () =>
{
    test("loading do not start and end test case not config", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.config = {
            "loading": false
        };

        const loading = new Loading();
        expect(loading.start()).toBe(undefined);
        expect(loading.end()).toBe(undefined);
    });

    test("loading do not start and end test case not callback", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.config = {
            "loading": {
                "callback": ""
            }
        };

        const loading = new Loading();
        expect(loading.start()).toBe(undefined);
        expect(loading.end()).toBe(undefined);
    });

    test("default loading start and end test", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        // @ts-ignore
        next2d.fw.config = {
            "loading": {
                "callback": "test"
            }
        };

        // @ts-ignore
        next2d.fw.DefaultLoading = class DefaultLoading
        {
            private readonly startValue: string;
            private readonly endValue: string;

            constructor()
            {
                this.startValue = "start";
                this.endValue   = "end";
            }

            start ()
            {
                expect(this.startValue).toBe("start");
            }

            end ()
            {
                expect(this.endValue).toBe("end");
            }
        };

        const packages: Map<string, any> = new Map();
        packages.clear();

        // @ts-ignore
        next2d.fw.packages = packages;

        const loading = new Loading();
        loading.start();
        loading.end();
    });

    test("callback loading start and end test", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        // @ts-ignore
        next2d.fw.config = {
            "loading": {
                "callback": "origin.loader"
            }
        };

        // @ts-ignore
        next2d.fw.DefaultLoading = class DefaultLoading
        {
            private readonly startValue: string;
            private readonly endValue: string;

            constructor()
            {
                this.startValue = "start";
                this.endValue   = "end";
            }

            start ()
            {
                expect(this.startValue).toBe("not start");
            }

            end ()
            {
                expect(this.endValue).toBe("not end");
            }
        };

        const packages: Map<string, any> = new Map();

        const OriginLoader = class OriginLoader
        {
            private readonly startValue: string;
            private readonly endValue: string;

            constructor()
            {
                this.startValue = "origin start";
                this.endValue   = "origin end";
            }

            start ()
            {
                expect(this.startValue).toBe("origin start");
            }

            end ()
            {
                expect(this.endValue).toBe("origin end");
            }
        };

        packages.set("origin.loader", OriginLoader);

        // @ts-ignore
        next2d.fw.packages = packages;

        const loading = new Loading();
        loading.start();
        loading.end();
    });
});
