import type { IRequest } from "src/interface/IRequest";
import { packages } from "../../../application/variable/Packages";
import { cache } from "../../../application/variable/Cache";
import { ResponseDTO } from "../../Response/dto/ResponseDTO";
import { execute as callbackService } from "../../../domain/callback/service/CallbackService";

/**
 * @description 指定先の外部データを非同期で取得
 *              Asynchronous acquisition of external data at specified destination
 *
 * @param  {IRequest} request_object
 * @return {Promise<any>}
 * @method
 * @public
 */
export const execute = async (request_object: IRequest): Promise<any> =>
{
    if (!request_object.class
        || !request_object.access
        || !request_object.method
        || !request_object.name
    ) {
        throw new Error("`class`, `access`, `method` and `name` must be set for custom requests.");
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

    const className = request_object.class;
    if (!packages.has(className)) {
        throw new Error("package not found.");
    }

    const CallbackClass: any = packages.get(className);
    const value = request_object.access === "static"
        ? await CallbackClass[request_object.method]()
        : await new CallbackClass()[request_object.method]();

    if (request_object.cache) {
        cache.set(name, value);
    }

    if (request_object.callback) {
        await callbackService(request_object.callback, value);
    }

    return new ResponseDTO(name, value);
};