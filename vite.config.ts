/// <reference types="vitest" />

import { defineConfig } from "vite";

export default defineConfig({
    "test": {
        "globals": true,
        "environment": "jsdom",
        "include": ["src/**/*.test.ts"]
    }
});