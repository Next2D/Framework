import "@next2d/player";
import { Application } from "./application/Application";
import { DefaultLoading } from "./domain/screen/DefaultLoading";
import { View } from "./view/View";
import { ViewModel } from "./view/ViewModel";
import { Content } from "./application/content/Content";
import { packages } from "./application/variable/Packages";
import { context } from "./application/variable/Context";
import { cache } from "./application/variable/Cache";
import { query } from "./application/variable/Query";
import { response } from "./application/variable/Response";
import { loaderInfoMap } from "./application/variable/LoaderInfoMap";

// output build version
console.log("%c Next2D Framework %c 1.5.5 %c https://next2d.app",
    "color: #fff; background: #5f5f5f",
    "color: #fff; background: #4bc729",
    "");

export {
    Application,
    DefaultLoading,
    View,
    ViewModel,
    Content,
    packages,
    context,
    cache,
    query,
    response,
    loaderInfoMap
};
