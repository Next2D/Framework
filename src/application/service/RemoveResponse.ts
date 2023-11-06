import { execute as requestParser } from "../../domain/parser/RequestParser";
import { loaderInfoMap } from "../variable/LoaderInfoMap";
import { response } from "../variable/Response";
import type { LoaderInfo } from "@next2d/display";
import type { ParentImpl } from "@next2d/interface";
import { RequestImpl } from "src/interface/RequestImpl";

/**
 * @param  {string} name
 * @return {void}
 * @method
 * @public
 */
export const execute = (name: string): void =>
{
    const requests: RequestImpl[] = requestParser(name);
    for (let idx: number = 0; idx < requests.length; ++idx) {

        const object: RequestImpl = requests[idx];

        if (object.type !== "content") {
            continue;
        }

        if (object.cache
            || !object.name
            || !response.has(object.name)
        ) {
            continue;
        }

        /**
         * キャッシュしないパッケージはインメモリから削除
         * Remove non-cached packages from in-memory
         */
        const content: ParentImpl<any> = response.get(object.name);
        const contentLoaderInfo: LoaderInfo | null = content._$loaderInfo;
        if (contentLoaderInfo && contentLoaderInfo._$data) {
            const symbols: Map<string, any> = contentLoaderInfo._$data.symbols;
            if (symbols.size) {
                for (const name of symbols.keys()) {
                    loaderInfoMap.delete(name);
                }
            }
        }
    }

    /**
     * レスポンスデータを初期化
     * Initialize response data
     */
    if (response.size) {
        response.clear();
    }
};