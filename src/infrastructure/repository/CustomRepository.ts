import type { ConfigParser } from "../../domain/parser/ConfigParser";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string|string[];
    body?: object;
    headers?: HeadersInit;
}

/**
 * 外部データ取得時のリクエストとレスポンスの管理クラス
 * Request and Response management class for JSON acquisition
 *
 * @class
 * @memberof infrastructure.repository
 */
export class CustomRepository
{
    /**
     * @description 指定先の外部データを非同期で取得
     *              Asynchronous acquisition of external data at specified destination
     *
     * @param  {object} object
     * @return {Promise<any>}
     * @method
     * @public
     */
    execute (object: Object): Promise<any>
    {
        return new Promise((resolve) =>
        {
            // @ts-ignore
            const parser: ConfigParser = next2d.fw.parser;

            // @ts-ignore
            const packages: Map<string, any> = next2d.fw.packages;

            const className: string = parser.execute(object.class);
            if (!packages.has(className)) {
                return resolve(null);
            }

            const CallbackClass: any = packages.get(className);
            const promise: Promise<any> = parser.execute(object.access) === "static"
                ? Promise.resolve(CallbackClass[parser.execute(object.method)]())
                : Promise.resolve(new CallbackClass()[parser.execute(object.method)]());

            return promise
                .then((value: any) =>
                {
                    return resolve(value);
                });
        });
    }
}