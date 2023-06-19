import { parser } from "../../application/variable/Parser";
import { Event } from "@next2d/player/dist/player/next2d/events/Event";
import { IOErrorEvent } from "@next2d/player/dist/player/next2d/events/IOErrorEvent";
import { URLRequestHeader } from "@next2d/player/dist/player/next2d/net/URLRequestHeader";
import { Loader } from "@next2d/player/dist/player/next2d/display/Loader";
import { URLRequest } from "@next2d/player/dist/player/next2d/net/URLRequest";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    callback?: string|string[];
    method?: string;
    body?: object;
    headers?: HeadersInit;
}

/**
 * NoCodeToolで制作したJSON取得時のリクエストとレスポンスの管理クラス
 * Request and Response management class for JSON acquisition
 *
 * @class
 * @memberof infrastructure.repository
 */
export class ContentRepository
{
    /**
     * @description 指定先のJSONを非同期で取得
     *              Asynchronously obtain JSON of the specified destination
     *
     * @param  {object} object
     * @return {Promise<any>}
     * @method
     * @public
     */
    execute (object: Object): Promise<any>
    {
        return new Promise((resolve, reject) =>
        {
            const request: URLRequest = new URLRequest(`${parser.execute(object.path)}`);

            const method = object.method
                ? parser.execute(object.method).toUpperCase()
                : "GET";

            switch (method) {

                case "DELETE":
                case "GET":
                case "HEAD":
                case "OPTIONS":
                case "POST":
                case "PUT":
                    request.method = method;
                    break;

                default:
                    request.method = "GET";
                    break;

            }

            if (object.headers) {
                for (const [name, value] of Object.entries(object.headers)) {
                    request
                        .requestHeaders
                        .push(new URLRequestHeader(name, value));
                }
            }

            if (object.body) {
                request.data = JSON.stringify(object.body);
            }

            const loader: Loader = new Loader();
            loader
                .contentLoaderInfo
                .addEventListener(Event.COMPLETE, (event: any) =>
                {
                    return resolve(event.currentTarget.content);
                });

            loader
                .contentLoaderInfo
                .addEventListener(IOErrorEvent.IO_ERROR, reject);

            loader.load(request);
        });
    }
}