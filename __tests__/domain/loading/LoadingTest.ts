import "@next2d/player";
import { Loading } from "../../../src/domain/loading/Loading";
import { $setConfig } from "../../../src/application/variable/Config";
import { packages } from "../../../src";

describe("LoadingTest", () =>
{
    test("loading do not start and end test case not config", () =>
    {
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
            "routing": {}
        };

        $setConfig(config);

        const loading = new Loading();
        expect(loading.start()).toBe(undefined);
        expect(loading.end()).toBe(undefined);
    });

    test("loading do not start and end test case not callback", () =>
    {
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
            "routing": {},
            "loading": {
                "callback": ""
            }
        };

        $setConfig(config);

        const loading = new Loading();
        expect(loading.start()).toBe(undefined);
        expect(loading.end()).toBe(undefined);
    });

    test("default loading start and end test", () =>
    {
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
            "routing": {},
            "loading": {
                "callback": "test"
            }
        };

        $setConfig(config);

        const TestLoading = class TestLoading
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

        packages.set("test", TestLoading);
        packages.clear();

        const loading = new Loading();
        loading.start();
        loading.end();
    });

    test("callback loading start and end test", () =>
    {
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
            "routing": {},
            "loading": {
                "callback": "origin.loader"
            }
        };

        $setConfig(config);

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

        packages.clear();
        packages.set("origin.loader", OriginLoader);

        const loading = new Loading();
        loading.start();
        loading.end();
    });
});
