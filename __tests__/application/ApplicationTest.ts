import { Application } from "../../src/application/Application";
import { RequestType } from "../../src/infrastructure/constant/RequestType";
import { ConfigParser } from "../../src/domain/parser/ConfigParser";
import { ResponseDTO } from "../../src/infrastructure/dto/ResponseDTO";

describe("ApplicationTest", () =>
{
    test("initialize test", () => {

        const config = {
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "test": {}
            }
        };
        const packages = [["app", "app"]];

        const app = new Application(config, packages);

        expect(app.initialize()).toBe(undefined);
    });

    test("loading test", () =>
    {
        // mock
        // @ts-ignore
        next2d.fw.context = next2d.createRootMovieClip();

        const config = {
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            },
            "routing": {
                "test": {}
            },
            "loading": true
        };
        const packages = [["app", "app"]];

        const app = new Application(config, packages);
        app.gotoView();
    });

    test("spa test", () =>
    {
        // mock

        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        const cache: Map<string, any> = new Map();
        cache.set("app_test", new ResponseDTO("app_test", "app success"));

        // @ts-ignore
        next2d.fw.cache = cache;

        // @ts-ignore
        next2d.fw.context = next2d.createRootMovieClip();

        const response: Map<string, any> = new Map();
        response.clear();
        expect(response.size).toBe(0);

        // @ts-ignore
        next2d.fw.response = response;

        const config = {
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
            "spa": true,
            "loading": true
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

        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        const cache: Map<string, any> = new Map();
        cache.set("app_test", new ResponseDTO());
        cache.set("", new ResponseDTO());

        // @ts-ignore
        next2d.fw.cache = cache;

        // @ts-ignore
        next2d.fw.context = next2d.createRootMovieClip();

        const response: Map<string, any> = new Map();
        response.clear();

        // @ts-ignore
        next2d.fw.response = response;

        const config = {
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
                            "name": "",
                            "path": "",
                            "cache": true
                        }
                    ]
                }
            },
            "gotoView": {
                "callback": ""
            },
            "spa": true,
            "loading": true
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