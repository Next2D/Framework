import type { DisplayObject } from "@next2d/display";
import { execute as configParserRequestsPropertyService } from "../../../application/Config/service/ConfigParserRequestsPropertyService";
import { loaderInfoMap } from "../../../application/variable/LoaderInfoMap";
import { response } from "../variable/Response";

/**
 * @description レスポンスデータを削除、キャッシュ設定があれば削除しない
 *              Remove response data, do not remove if cache setting is present
 *
 * @param  {string} name
 * @return {void}
 * @method
 * @public
 */
export const execute = <D extends DisplayObject> (name: string): void =>
{
    const requests = configParserRequestsPropertyService(name);
    for (let idx = 0; idx < requests.length; ++idx) {

        const object = requests[idx];

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
        const content = response.get(object.name) as D;
        const contentLoaderInfo = content.loaderInfo;
        if (contentLoaderInfo && contentLoaderInfo.data) {
            const symbols: Map<string, number> = contentLoaderInfo.data.symbols;
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