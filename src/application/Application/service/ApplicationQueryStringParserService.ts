import type { IQueryObject } from "src/interface/IQueryObject";
import { $getConfig } from "../../variable/Config";
import { query } from "../../variable/Query";

/**
 * @description 指定されたQueryStringか、URLのQueryStringをquery mapに登録
 *              Register the specified QueryString or URL QueryString in the query map
 *
 * @param  {string} [name=""]
 * @return {IQueryObject}
 * @method
 * @protected
 */
export const execute = (name: string = ""): IQueryObject =>
{
    /**
     * 前のシーンのクエリデータを初期化
     * Initialize query data from previous scene
     */
    if (query.size) {
        query.clear();
    }

    /**
     * QueryStringがあれば分解
     * Disassemble QueryString if available
     */
    let queryString = "";
    if (!name && location.search) {
        queryString = location.search;
        const parameters = queryString.slice(1).split("&");
        for (let idx = 0; idx < parameters.length; ++idx) {
            const pair = parameters[idx].split("=");
            query.set(pair[0], pair[1]);
        }
    }

    const config = $getConfig();
    const defaultTop = config?.defaultTop || "top";
    if (!name) {
        const names = location.pathname.split("/");
        names.shift();
        name = `${names.join("/")}`;
        if (name && config && config.routing) {
            const routing = config.routing[name];
            if (!routing) {
                name = defaultTop;
            }

            if (routing && routing.private) {
                name = routing.redirect || defaultTop;
            }
        }

        if (!name) {
            name = defaultTop;
        }
    }

    /**
     * 任意で設定したQueryStringを分解
     * Decompose an arbitrarily set QueryString
     */
    if (name.indexOf("?") > -1) {

        const names = name.split("?");

        name  = names[0];
        queryString = `?${names[1]}`;

        const parameters = names[1].split("&");
        for (let idx = 0; idx < parameters.length; ++idx) {
            const pair = parameters[idx].split("=");
            query.set(pair[0], pair[1]);
        }
    }

    if (name.slice(0, 1) === ".") {
        name = name.split("/").slice(1).join("/") || defaultTop;
    }

    if (name.indexOf("@") > -1) {
        name = name.replace("@", "");
    }

    return {
        "name": name,
        "queryString": queryString
    };
};