import { Application } from "../src/application/Application";
import { Content } from "../src/application/content/Content";
import { View } from "../src/view/View";
import { ViewModel } from "../src/view/ViewModel";
import { DefaultLoading } from "../src/domain/screen/DefaultLoading";

interface Packages {
    Application:    typeof Application;
    Content:        typeof Content;
    DefaultLoading: typeof DefaultLoading;
    View:           typeof View;
    ViewModel:      typeof ViewModel;
    cache:          Map<string, any>,
    query:          Map<string, any>,
    response:       Map<string, any>,
    loaderInfo:     Map<string, any>,
    config?:        object;
    application?:   Application;
    context?:       Content;
}

interface Next2D {
    fw?: Packages;
}

// eslint-disable-next-line no-unused-vars
declare const next2d: Next2D;