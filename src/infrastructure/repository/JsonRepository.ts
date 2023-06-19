import { parser } from "../../application/variable/Parser";

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
 * JSON取得時のリクエストとレスポンスの管理クラス
 * Request and Response management class for JSON acquisition
 *
 * @class
 * @memberof infrastructure.repository
 */
export class JsonRepository
{
    /**
     * @description 指定先のJSONを非同期で取得
     *              Asynchronously obtain JSON of the specified destination
     *
     * @param  {object} object
     * @return {Promise}
     * @method
     * @public
     */
    execute (object: Object): Promise<any>
    {
        const options: RequestInit = {};

        const method: string = options.method = object.method
            ? parser.execute(object.method).toUpperCase()
            : "GET";

        const body: any = object.body
            && method === "POST" || method === "PUT"
            ? JSON.stringify(object.body)
            : null;

        if (body) {
            options.body = body;
        }

        if (object.headers) {
            options.headers = object.headers;
        }

        return fetch(`${parser.execute(object.path)}`, options)
            .then((response: Response) =>
            {
                return response.json();
            });
    }
}