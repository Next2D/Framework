import type { RequestImpl } from "src/interface/RequestImpl";
import { Loader } from "@next2d/display";
import {
    Event,
    IOErrorEvent
} from "@next2d/events";
import {
    URLRequestHeader,
    URLRequest
} from "@next2d/net";

/**
 * @description 指定先のJSONを非同期で取得
 *              Asynchronously obtain JSON of the specified destination
 *
 * @param  {object} request_object
 * @return {Promise<any>}
 * @method
 * @public
 */
export const execute = (request_object: RequestImpl): Promise<any> =>
{
    return new Promise((resolve, reject) =>
    {
        if (!request_object.path) {
            return reject();
        }

        const request: URLRequest = new URLRequest(request_object.path);

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
                request.method = method;
                break;

            default:
                request.method = "GET";
                break;

        }

        if (request_object.headers) {
            for (const [name, value] of Object.entries(request_object.headers)) {
                request
                    .requestHeaders
                    .push(new URLRequestHeader(name, value));
            }
        }

        if (request_object.body) {
            request.data = JSON.stringify(request_object.body);
        }

        const loader: Loader = new Loader();
        loader
            .contentLoaderInfo
            .addEventListener(Event.COMPLETE, (event: Event) =>
            {
                return resolve(event.currentTarget.content);
            });

        loader
            .contentLoaderInfo
            .addEventListener(IOErrorEvent.IO_ERROR, reject);

        loader.load(request);
    });
};