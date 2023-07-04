import { Next2D } from "@next2d/core";

declare global {

    // eslint-disable-next-line no-unused-vars
    const next2d: Next2D;

    // eslint-disable-next-line no-unused-vars
    interface Window {
        next2d: Next2D;
    }
}