import { execute } from "./ContentBuilderService";
import { ShapeContent } from "../../ShapeContent";
import { loaderInfoMap } from "../../../variable/LoaderInfoMap";
import { Shape, type LoaderInfo } from "@next2d/display";
import { describe, expect, it, vi } from "vitest";

describe("ContentBuilderService Test", () =>
{
    it("test case", () =>
    {
        const displayObject = new ShapeContent();

        let state = "none";
        displayObject.$sync = vi.fn(() =>
        {
            state = "sync";
        });

        const map: Map<string, number> = new Map();
        map.set(Shape.namespace, 1);
        loaderInfoMap.clear();
        loaderInfoMap.set(Shape.namespace, {
            "data": { 
                "stage": {
                    "width": 100,
                    "height": 100,
                    "fps": 60,
                    "bgColor": "#000000"
                },
                "characters": [
                    {
                        "extends": Shape.namespace,
                        "bounds": { "xMin": 0, "yMin": 0, "xMax": 100, "yMax": 100 },
                        "bitmapId": 0
                    },
                    {
                        "extends": Shape.namespace,
                        "bounds": { "xMin": 0, "yMin": 0, "xMax": 100, "yMax": 100 },
                        "bitmapId": 0
                    }
                ],
                "symbols": map
            }
        } as LoaderInfo);

        expect(state).toBe("none");
        expect(displayObject.characterId).toBe(-1);
        execute(displayObject);
        expect(state).toBe("sync");
        expect(displayObject.characterId).toBe(1);
    });
});