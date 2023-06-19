import { DefaultLoading } from "../../../src/domain/screen/DefaultLoading";
import { $setConfig } from "../../../src/application/variable/Config";
import { $createContext, context } from "../../../src/application/variable/Context";

describe("DefaultLoadingTest", () =>
{
    test("start function no element test", () =>
    {
        // @ts-ignore
        $elements.clear();

        // @ts-ignore
        $elements.set(
            "__next2d__framework_loading",
            // @ts-ignore
            document.createElement()
        );

        const defaultLoading = new DefaultLoading();
        defaultLoading.start();

        const element = document
            .getElementById("__next2d__framework_loading");

        if (element) {
            expect(element.getAttribute("style")).toBe("");
        }
    });

    test("start function no parent test", () =>
    {
        // @ts-ignore
        $elements.clear();

        // mock
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            }
        };

        $setConfig(config);
        if (context) {
            const defaultLoading = new DefaultLoading();
            defaultLoading.start();

            // @ts-ignore
            expect($elements.size).toBe(0);
        } else {
            $createContext(config)
                .then(() =>
                {
                    const defaultLoading = new DefaultLoading();
                    defaultLoading.start();

                    // @ts-ignore
                    expect($elements.size).toBe(0);
                });
        }

    });

    test("start function test", () =>
    {
        // @ts-ignore
        $elements.clear();

        // mock
        const config = {
            "platform": "web",
            "spa": true,
            "stage": {
                "width": 240,
                "height": 240,
                "fps": 12,
                "options": {}
            }
        };

        $setConfig(config);
        if (context) {
            // @ts-ignore
            $elements.clear();

            // @ts-ignore
            $elements.set("__next2d__", document.createElement());

            const defaultLoading = new DefaultLoading();
            defaultLoading.start();

            const element = document
                .getElementById("__next2d__framework_loading");

            if (element) {
                expect(element.id).toBe("__next2d__framework_loading");
            }
        } else {
            $createContext(config)
                .then(() =>
                {
                    // @ts-ignore
                    $elements.clear();

                    // @ts-ignore
                    $elements.set("__next2d__", document.createElement());

                    const defaultLoading = new DefaultLoading();
                    defaultLoading.start();

                    const element = document
                        .getElementById("__next2d__framework_loading");

                    if (element) {
                        expect(element.id).toBe("__next2d__framework_loading");
                    }
                });
        }
    });

    test("end function no element test", () =>
    {
        // @ts-ignore
        $elements.clear();

        const defaultLoading = new DefaultLoading();
        defaultLoading.end();

        const element = document
            .getElementById("__next2d__framework_loading");

        expect(element).toBe(null);
    });

    test("end function element test", () =>
    {
        // @ts-ignore
        $elements.clear();

        // @ts-ignore
        $elements.set(
            "__next2d__framework_loading",
            // @ts-ignore
            document.createElement()
        );

        const defaultLoading = new DefaultLoading();
        defaultLoading.end();

        const element = document
            .getElementById("__next2d__framework_loading");

        if (element) {
            expect(element.getAttribute("style")).toBe("display:none;");
        }
    });
});