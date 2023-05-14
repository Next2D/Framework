"use strict";

import { Application } from "./application/Application";
import { Content } from "./application/content/Content";
import { View } from "./view/View";
import { ViewModel } from "./view/ViewModel";
import { DefaultLoading } from "./domain/screen/DefaultLoading";

if (!("fw" in window.next2d)) {

    window.next2d.fw = {
        "Application":    Application,
        "Content":        Content,
        "DefaultLoading": DefaultLoading,
        "View":           View,
        "ViewModel":      ViewModel,
        "cache":          new Map(),
        "query":          new Map(),
        "response":       new Map(),
        "loaderInfo":     new Map(),
        "config":         {}
    };

    // output build version
    const packageJson = require("../package.json");
    console.log(`%c Next2D Framework %c ${packageJson.version} %c https://next2d.app`,
        "color: #fff; background: #5f5f5f",
        "color: #fff; background: #4bc729",
        "");

}
