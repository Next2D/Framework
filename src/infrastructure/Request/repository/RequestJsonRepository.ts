import type { IRequest } from "../../../interface/IRequest";
import { cache } from "../../../application/variable/Cache";
import { ResponseDTO } from "../../Response/dto/ResponseDTO";
import { execute as callbackService } from "../../../domain/callback/service/CallbackService";

/**
 * @description 指定先のJSONを非同期で取得
 *              Asynchronously obtain JSON of the specified destination
 *
 * @param  {IRequest} request_object
 * @return {Promise<any>}
 * @method
 * @public
 */
export const execute = async (request_object: IRequest): Promise<any> =>
{
    if (!request_object.path || !request_object.name) {
        throw new Error("`path` and `name` must be set for json requests.");
    }

    const name = request_object.name;

    /**
     * キャッシュを利用する場合はキャッシュデータをチェック
     * Check cache data if cache is used
     */
    if (request_object.cache) {
        if (cache.size && cache.has(name)) {

            const value: any = cache.get(name);

            if (request_object.callback) {
                await callbackService(request_object.callback, value);
            }

            return new ResponseDTO(name, value);
        }
    }

    const options: RequestInit = {};

    const method = options.method = request_object.method
        ? request_object.method.toUpperCase()
        : "GET";

    const body = request_object.body
        && method === "POST" || method === "PUT"
        ? JSON.stringify(request_object.body)
        : null;

    if (body) {
        options.body = body;
    }

    if (request_object.headers) {
        options.headers = request_object.headers;
    }

    const response = await fetch(request_object.path, options);
    const value = await response.json();

    if (request_object.cache) {
        cache.set(name, value);
    }

    if (request_object.callback) {
        await callbackService(request_object.callback, value);
    }

    return new ResponseDTO(name, value);
};