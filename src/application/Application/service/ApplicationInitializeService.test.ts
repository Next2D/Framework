import type { IConfig } from "../../../interface/IConfig";
import type { IPackages } from "../../../interface/IPackages";
import { execute } from "./ApplicationInitializeService";
import { Application } from "../../Application";
import { View } from "../../../view/View";
import { $getConfig } from "../../variable/Config";
import { packages } from "../../variable/Packages";
import { describe, expect, it, vi } from "vitest";

describe("ApplicationInitializeService", () =>
{
    it("test case", () => 
    {
        let state = "";
        window.addEventListener = vi.fn((name) => 
        {
            state = name;
        });

        const app = new Application();
        const config: IConfig = {
            "platform": "web",
            "stage": {
                "width": 640,
                "height": 480,
                "fps": 60
            },
            "spa": true
        };

        const buildPackages: IPackages = [[
            "view", View
        ]];

        expect(state).toBe("");
        expect(packages.size).toBe(0);
        expect($getConfig()).toBe(undefined);

        execute(app, config, buildPackages);

        expect($getConfig()).toBe(config);
        expect(packages.size).toBe(1);
        expect(packages.get("view")).toBe(View);
        expect(state).toBe("popstate");
    });

    it("test case", () =>
    {
        let state = "";
        window.addEventListener = vi.fn((name) => 
        {
            state = name;
        });

        const app = new Application();
        const config: IConfig = {
            "platform": "web",
            "stage": {
                "width": 640,
                "height": 480,
                "fps": 60
            },
            "spa": false
        };

        const buildPackages: IPackages = [[
            "view", View
        ]];

        expect(state).toBe("");
        execute(app, config, buildPackages);
        expect(state).toBe("");
    });
});