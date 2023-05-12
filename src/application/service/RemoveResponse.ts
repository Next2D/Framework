import { RequestType } from "../../infrastructure/constant/RequestType";
import { RequestParser } from "../../domain/parser/RequestParser";

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
        // @ts-ignore
        const response: Map<string, any> = next2d.fw.response;

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
            const loaderInfo: any = content._$loaderInfo;
            if (loaderInfo._$data) {
                const symbols: Map<string, any> = loaderInfo._$data.symbols;
                if (symbols.size) {
                    for (const name of symbols.keys()) {
                        // @ts-ignore
                        next2d.fw.loaderInfo.delete(name);
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