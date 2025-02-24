import "@next2d/player";
import { Application } from "./application/Application";
import { View } from "./view/View";
import { ViewModel } from "./view/ViewModel";
import { MovieClipContent } from "./application/content/MovieClipContent";
import { ShapeContent } from "./application/content/ShapeContent";
import { TextFieldContent } from "./application/content/TextFieldContent";
import { VideoContent } from "./application/content/VideoContent";

// output build version
console.log("%c Next2D Framework %c 3.0.0 %c https://next2d.app",
    "color: #fff; background: #5f5f5f",
    "color: #fff; background: #4bc729",
    "");

/**
 * @type {Application}
 * @public
 */
const app: Application = new Application();

export {
    app,
    View,
    ViewModel,
    MovieClipContent,
    ShapeContent,
    TextFieldContent,
    VideoContent
};