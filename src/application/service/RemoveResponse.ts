import { RequestType } from "../../infrastructure/constant/RequestType";
import { RequestParser } from "../../domain/parser/RequestParser";
import { loaderInfoMap } from "../variable/LoaderInfoMap";
import { response } from "../variable/Response";
import type { LoaderInfo } from "@next2d/player/dist/player/next2d/display/LoaderInfo";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class?: string;
    access?: string;
    method?: string;
    callback?: string | string[];
}

/**
 * @class
 * @memberof application.service
 */
export class RemoveResponse
{
    private readonly _$requestParser: RequestParser;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {RequestParser}
         * @private
         */
        this._$requestParser = new RequestParser();
    }

    /**
     * @param  {string} name
     * @return {void}
     * @method
     * @public
     */
    execute (name: string): void
    {
        const requests: Object[] = this._$requestParser.execute(name);
        for (let idx: number = 0; idx < requests.length; ++idx) {

            const object: Object = requests[idx];

            if (object.type !== RequestType.CONTENT) {
                continue;
            }

            if (object.cache || !response.has(object.name)) {
                continue;
            }

            /**
             * キャッシュしないパッケージはインメモリから削除
             * Remove non-cached packages from in-memory
             */
            const content: any = response.get(object.name);
            const contentLoaderInfo: LoaderInfo = content._$loaderInfo;
            if (contentLoaderInfo._$data) {
                const symbols: Map<string, any> = contentLoaderInfo._$data.symbols;
                if (symbols.size) {
                    for (const name of symbols.keys()) {
                        loaderInfoMap.delete(name);
                    }
                }
            }
        }

        /**
         * レスポンスデータをマップに格納
         * Stores response data in a map
         */
        if (response.size) {
            response.clear();
        }
    }
}