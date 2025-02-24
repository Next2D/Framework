import type { IRequest } from "src/interface/IRequest";
import { Loader } from "@next2d/display";
import { URLRequest } from "@next2d/net";
import { cache } from "../../../application/variable/Cache";
import { loaderInfoMap } from "../../../application/variable/LoaderInfoMap";
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
        throw new Error("`path` and `name` must be set for content requests.");
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

    const urlRequest = new URLRequest(request_object.path);

    const method: string = request_object.method
        ? request_object.method.toUpperCase()
        : "GET";

    switch (method) {

        case "DELETE":
        case "GET":
        case "HEAD":
        case "OPTIONS":
        case "POST":
        case "PUT":
            urlRequest.method = method;
            break;

        default:
            urlRequest.method = "GET";
            break;

    }

    if (request_object.headers) {
        for (const [name, value] of Object.entries(request_object.headers)) {
            urlRequest
                .requestHeaders
                .push({ name, value });
        }
    }

    if (request_object.body) {
        urlRequest.data = JSON.stringify(request_object.body);
    }

    const loader = new Loader();
    await loader.load(urlRequest);

    const content = loader.content;

    /**
     * Animation Toolで設定したシンボルをマップに登録
     * Register the symbols set by Animation Tool to the map
     */
    const loaderInfo = loader.loaderInfo;
    if (loaderInfo.data) {
        const symbols: Map<string, number> = loaderInfo.data.symbols;
        if (symbols.size) {
            for (const name of symbols.keys()) {
                loaderInfoMap.set(name, loaderInfo);
            }
        }
    }

    if (request_object.cache) {
        cache.set(request_object.name, content);
    }

    if (request_object.callback) {
        await callbackService(request_object.callback, content);
    }

    return new ResponseDTO(request_object.name, content);
};