import { Next2D } from "./next2d";

declare global {
    // eslint-disable-next-line no-unused-vars
    interface Window {
        next2d: Next2D;
    }
}