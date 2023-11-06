import type { RequestImpl } from "src/interface/RequestImpl";
import { ResponseDTO } from "../dto/ResponseDTO";
import { cache } from "../../application/variable/Cache";
import { execute as callback } from "../../domain/callback/Callback";
import { execute as customRepository } from "../repository/CustomRepository";

/**
 * @description Repositoryから外部データを取得して、configのcallbackがあれば実行
 *              キャッシュ設定がOnの時はJSONをキャッシュにセット
 *              Retrieve external data from Repository and run config callback if any.
 *              If cache setting is On, set JSON to cache.
 *
 * @param  {object} request_object
 * @return {Promise<ResponseDTO>}
 * @method
 * @public
 */
export const execute = async (request_object: RequestImpl): Promise<ResponseDTO> =>
{
    if (!request_object.name) {
        throw new Error("`name` must be set for custom requests.");
    }

    /**
     * キャッシュを利用する場合はキャッシュデータをチェック
     * Check cache data if cache is used
     */
    if (request_object.cache) {

        if (cache.size && cache.has(request_object.name)) {

            const value: any = cache.get(request_object.name);

            if (request_object.callback) {
                const promises: Promise<Awaited<any>[]|void>[] = [];
                promises.push(callback(
                    request_object.callback, value
                ));

                await Promise.all(promises);
            }

            return new ResponseDTO(request_object.name, value);
        }
    }

    const response: any = await customRepository(request_object);

    if (request_object.cache) {
        cache.set(request_object.name, response);
    }

    if (request_object.callback) {
        const promises: Promise<Awaited<any>[]|void>[] = [];
        promises.push(callback(
            request_object.callback, response
        ));

        await Promise.all(promises);
    }

    return new ResponseDTO(request_object.name, response);
};