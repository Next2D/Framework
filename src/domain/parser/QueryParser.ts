import type { QueryObjectImpl } from "src/interface/QueryObjectImpl";
import type { RoutingImpl } from "src/interface/RoutingImpl";
import { config } from "../../application/variable/Config";
import { query } from "../../application/variable/Query";

/**
 * @description 指定されたQueryStringか、URLのQueryStringをquery mapに登録
 *              Register the specified QueryString or URL QueryString in the query map
 *
 * @param  {string} [name=""]
 * @return {object}
 * @method
 * @public
 */
export const execute = (name: string = ""): QueryObjectImpl =>
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
    let queryString: string = "";
    if (!name && location.search) {
        queryString = location.search;
        const parameters = queryString.slice(1).split("&");
        for (let idx: number = 0; idx < parameters.length; ++idx) {
            const pair: string[] = parameters[idx].split("=");
            query.set(pair[0], pair[1]);
        }
    }

    if (!name) {
        const names: string[] = location.pathname.split("/");
        names.shift();
        name = `${names.join("/")}`;
        if (name && config && config.routing) {
            const routing: RoutingImpl = config.routing[name];
            if (!routing) {
                name = "top";
            }

            if (routing && routing.private) {
                name = routing.redirect || "top";
            }
        }

        if (!name) {
            name = "top";
        }
    }

    /**
     * 任意で設定したQueryStringを分解
     * Decompose an arbitrarily set QueryString
     */
    if (name.indexOf("?") > -1) {

        const names: string[] = name.split("?");

        name  = names[0];
        queryString = `?${names[1]}`;

        const parameters: string[] = names[1].split("&");
        for (let idx: number = 0; idx < parameters.length; ++idx) {
            const pair: string[] = parameters[idx].split("=");
            query.set(pair[0], pair[1]);
        }
    }

    if (name.slice(0, 1) === ".") {
        name = name.split("/").slice(1).join("/") || "top";
    }

    if (name.indexOf("@") > -1) {
        name = name.replace("@", "");
    }

    return {
        "name": name,
        "queryString": queryString
    };
};