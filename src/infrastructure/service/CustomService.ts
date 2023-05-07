import { CustomRepository } from "../repository/CustomRepository";
import { Callback } from "../../domain/callback/Callback";
import { ResponseDTO } from "../dto/ResponseDTO";
import { ConfigParser } from "../../domain/parser/ConfigParser";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string | string[];
    body?: object;
    headers?: HeadersInit;
}

/**
 * JSON取得時のロジッククラス
 * Logic class for JSON acquisition
 *
 * @class
 * @memberof infrastructure.service
 */
export class CustomService
{
    private readonly _$repository: CustomRepository;
    private readonly _$callback: Callback;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {CustomRepository}
         * @private
         */
        this._$repository = new CustomRepository();

        /**
         * @type {Callback}
         * @private
         */
        this._$callback = new Callback();
    }

    /**
     * @description Repositoryから外部データを取得して、configのcallbackがあれば実行
     *              キャッシュ設定がOnの時はJSONをキャッシュにセット
     *              Retrieve external data from Repository and run config callback if any.
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

            // @ts-ignore
            const parser: ConfigParser = next2d.fw.parser;

            // @ts-ignore
            const cache: Map<string, any>  = next2d.fw.cache;

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
            .then((response: any) =>
            {
                // @ts-ignore
                const parser: ConfigParser = next2d.fw.parser;

                const name:string = parser.execute(object.name);
                if (object.cache && object.name) {
                    // @ts-ignore
                    const cache: Map<string, any>  = next2d.fw.cache;
                    cache.set(name, response);
                }

                const promises: Promise<Awaited<any>[]|void>[] = [];
                if (object.callback) {
                    promises.push(this._$callback.execute(
                        object.callback, response
                    ));
                }

                return Promise
                    .all(promises)
                    .then((): ResponseDTO =>
                    {
                        return new ResponseDTO(name, response);
                    });
            });
    }
}