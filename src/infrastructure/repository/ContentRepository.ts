import { RequestType } from "../constant/RequestType";
import { ConfigParser } from "../../domain/parser/ConfigParser";

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
            // @ts-ignore
            const { URLRequest, URLRequestHeader, URLRequestMethod } = next2d.net;
            // @ts-ignore
            const { Loader } = next2d.display;
            // @ts-ignore
            const { Event, IOErrorEvent } = next2d.events;

            // @ts-ignore
            const parser: ConfigParser = next2d.fw.parser;

            const request: any = new URLRequest(`${parser.execute(object.path)}`);

            request.method = object.method
                ? parser.execute(object.method).toUpperCase()
                : URLRequestMethod.GET;

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

            const loader = new Loader();
            loader
                .contentLoaderInfo
                .addEventListener(Event.COMPLETE, (event: any) =>
                {
                    return resolve(event.currentTarget.content);
                });

            loader
                .contentLoaderInfo
                .addEventListener(IOErrorEvent.IO_ERROR, reject);

            if (parser.execute(object.type) === RequestType.IMAGE) {

                loader.loadImage(request);

            } else {

                loader.load(request);

            }
        });
    }
}