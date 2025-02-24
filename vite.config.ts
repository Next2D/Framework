/// <reference types="vitest" />
/// <reference types="vite/client" />
/// <reference types="vitest/config" />

import { defineConfig } from "vitest/config";

export default defineConfig({
    "test": {
        "globals": true,
        "environment": "jsdom",
        "setupFiles": [
            "test.setup.ts",
            "@vitest/web-worker",
            "vitest-webgl-canvas-mock"
        ],
        "include": ["src/**/*.test.ts"]
    }
});