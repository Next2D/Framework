import { execute as contentRepository } from "../repository/ContentRepository";
import { execute as callback } from "../../domain/callback/Callback";
import { ResponseDTO } from "../dto/ResponseDTO";
import { cache } from "../../application/variable/Cache";
import { loaderInfoMap } from "../../application/variable/LoaderInfoMap";
import type { LoaderInfo } from "@next2d/display";
import type { RequestImpl } from "src/interface/RequestImpl";

/**
 * @description RepositoryからJSONを取得して、configのcallbackがあれば実行
 *              キャッシュ設定がOnの時はJSONをキャッシュにセット
 *              Get JSON from Repository and run config callback if any.
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
        throw new Error("`name` must be set for content requests.");
    }

    /**
     * キャッシュを利用する場合はキャッシュデータをチェック
     * Check cache data if cache is used
     */
    if (request_object.cache) {

        if (cache.size && cache.has(request_object.name)) {

            const value: any = cache.get(request_object.name);

            /**
             * コールバック設定があれば実行
             * Execute callback settings if any.
             */
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

    /**
     * 指定のコンテンツデータを取得
     * Obtain specified content data
     */
    const content = await contentRepository(request_object);

    /**
     * キャッシュ設定がonならキャッシュに登録
     * If the cache setting is on, register it in the cache.
     */
    if (request_object.cache) {
        cache.set(request_object.name, content);
    }

    /**
     * Animation Toolで設定したシンボルをマップに登録
     * Register the symbols set by Animation Tool to the map
     */
    const loaderInfo: LoaderInfo = content._$loaderInfo as NonNullable<LoaderInfo>;
    if (loaderInfo._$data) {
        const symbols: Map<string, any> = loaderInfo._$data.symbols;
        if (symbols.size) {
            for (const name of symbols.keys()) {
                loaderInfoMap.set(name, loaderInfo);
            }
        }
    }

    /**
     * コールバック設定があれば実行
     * Execute callback settings if any.
     */
    if (request_object.callback) {
        const promises: Promise<Awaited<any>[]|void>[] = [];
        promises.push(callback(
            request_object.callback, content
        ));

        await Promise.all(promises);
    }

    return new ResponseDTO(request_object.name, content);
};