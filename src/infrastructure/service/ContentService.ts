import { ContentRepository } from "../repository/ContentRepository";
import { Callback } from "../../domain/callback/Callback";
import { ResponseDTO } from "../dto/ResponseDTO";
import { parser } from "../../application/variable/Parser";
import { cache } from "../../application/variable/Cache";
import { loaderInfoMap } from "../../application/variable/LoaderInfoMap";
import type { LoaderInfo } from "@next2d/display";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    callback?: string | string[];
    method?: string;
    body?: object;
    headers?: HeadersInit;
}

/**
 * NoCodeToolで制作したJSON取得時のロジッククラス
 * Logic class for JSON acquisition produced by NoCodeTool
 *
 * @class
 * @memberof infrastructure.service
 */
export class ContentService
{
    private _$repository: ContentRepository;
    private _$callback: Callback;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {ContentRepository}
         * @private
         */
        this._$repository = new ContentRepository();

        /**
         * @type {Callback}
         * @private
         */
        this._$callback = new Callback();
    }

    /**
     * @description RepositoryからJSONを取得して、configのcallbackがあれば実行
     *              キャッシュ設定がOnの時はJSONをキャッシュにセット
     *              Get JSON from Repository and run config callback if any.
     *              If cache setting is On, set JSON to cache.
     *
     * @param  {object} object
     * @return {Promise<ResponseDTO>}
     * @method
     * @public
     */
    execute (object: Object): Promise<ResponseDTO>
    {
        /**
         * キャッシュを利用する場合はキャッシュデータをチェック
         * Check cache data if cache is used
         */
        if (object.cache && object.name) {

            const name: string = parser.execute(object.name);
            if (cache.size && cache.has(name)) {

                const value: any = cache.get(name);

                const promises: Promise<Awaited<any>[]|void>[] = [];
                if (object.callback) {
                    promises.push(this._$callback.execute(
                        object.callback, value
                    ));
                }

                return Promise
                    .all(promises)
                    .then((): ResponseDTO =>
                    {
                        return new ResponseDTO(name, value);
                    });
            }
        }

        return this
            ._$repository
            .execute(object)
            .then((content: any) =>
            {
                const name: string = parser.execute(object.name);
                if (object.cache && object.name) {
                    cache.set(name, content);
                }

                const loaderInfo: LoaderInfo = content._$loaderInfo;

                // DisplayObjectContainer
                if (loaderInfo._$data) {
                    const symbols: Map<string, any> = loaderInfo._$data.symbols;
                    if (symbols.size) {
                        for (const name of symbols.keys()) {
                            loaderInfoMap.set(name, loaderInfo);
                        }
                    }
                }

                const promises: Promise<Awaited<any>[]|void>[] = [];
                if (object.callback) {
                    promises.push(this._$callback.execute(
                        object.callback, content
                    ));
                }

                return Promise
                    .all(promises)
                    .then((): ResponseDTO =>
                    {
                        return new ResponseDTO(name, content);
                    });
            });
    }
}