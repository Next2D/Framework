import "@next2d/player";
import { Application } from "../../src/application/Application";
import { RequestType } from "../../src/infrastructure/constant/RequestType";
import { cache } from "../../src/application/variable/Cache";
import { response } from "../../src/application/variable/Response";
import { ResponseDTO } from "../../src/infrastructure/dto/ResponseDTO";
import { $createContext } from "../../src/application/variable/Context";

describe("ApplicationTest", () =>
{
    test("initialize test", () => {

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
                    "requests": [{
                        "type": RequestType.JSON,
                        "path": "."
                    }]
                }
            }
        };
        const packages = [["app", "app"]];

        const app = new Application(config, packages);

        expect(app.initialize()).toBe(undefined);
    });

    test("loading test", () =>
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
            "routing": {
                "test": {
                    "requests": [{
                        "type": RequestType.JSON,
                        "path": "."
                    }]
                }
            }
        };

        $createContext(config);

        const packages = [["app", "app"]];

        const app = new Application(config, packages);
        app.gotoView();
    });

    test("spa test", () =>
    {
        cache.clear();
        cache.set("app_test", new ResponseDTO("app_test", "app success"));

        response.clear();
        expect(response.size).toBe(0);

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
                "top": {
                    "requests": [
                        {
                            "type": RequestType.JSON,
                            "name": "app_test",
                            "path": "",
                            "cache": true
                        }
                    ]
                }
            },
            "gotoView": {
                "callback": ""
            },
            "loading": {
                "callback": ""
            }
        };
        const packages = [["app", "app"]];

        const app = new Application(config, packages);

        app
            .gotoView()
            .then((result) =>
            {
                expect(result).toBe(undefined);
            });

        // @ts-ignore
        if (!$windowEventMap.has("popstate")) {
            throw new Error("stop test");
        }

        // @ts-ignore
        $windowEventMap.get("popstate")();
    });

    test("spa response zero test", () =>
    {
        // mock
        cache.clear();
        cache.set("app_test", new ResponseDTO());
        cache.set("abc", new ResponseDTO());

        response.clear();

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
                "top": {
                    "requests": [
                        {
                            "type": RequestType.JSON,
                            "name": "app_test",
                            "path": "",
                            "cache": true
                        },
                        {
                            "type": RequestType.CONTENT,
                            "name": "abc",
                            "path": "",
                            "cache": true
                        }
                    ]
                }
            },
            "gotoView": {
                "callback": ""
            },
            "loading": {
                "callback": ""
            }
        };
        const packages = [["app", "app"]];

        const app = new Application(config, packages);

        app
            .gotoView()
            .then((result) =>
            {
                expect(result).toBe(undefined);
            });

        // @ts-ignore
        if (!$windowEventMap.has("popstate")) {
            throw new Error("stop test");
        }

        // @ts-ignore
        $windowEventMap.get("popstate")();
    });
});