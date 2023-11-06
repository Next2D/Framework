import type { RequestImpl } from "src/interface/RequestImpl";

/**
 * @description 指定先のJSONを非同期で取得
 *              Asynchronously obtain JSON of the specified destination
 *
 * @param  {object} request_object
 * @return {Promise}
 * @method
 * @public
 */
export const execute = async (request_object: RequestImpl): Promise<any> =>
{
    if (!request_object.path) {
        throw new Error("`path` must be set for json requests.");
    }

    const options: RequestInit = {};

    const method: string = options.method = request_object.method
        ? request_object.method.toUpperCase()
        : "GET";

    const body: any = request_object.body
        && method === "POST" || method === "PUT"
        ? JSON.stringify(request_object.body)
        : null;

    if (body) {
        options.body = body;
    }

    if (request_object.headers) {
        options.headers = request_object.headers;
    }

    const response: Response = await fetch(request_object.path, options);
    return await response.json();
};