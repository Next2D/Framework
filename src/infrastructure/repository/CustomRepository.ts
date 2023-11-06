import type { RequestImpl } from "src/interface/RequestImpl";
import { packages } from "../../application/variable/Packages";

/**
 * @description 指定先の外部データを非同期で取得
 *              Asynchronous acquisition of external data at specified destination
 *
 * @param  {object} request_object
 * @return {Promise<any>}
 * @method
 * @public
 */
export const execute = (request_object: RequestImpl): Promise<any> =>
{
    return new Promise((resolve) =>
    {
        if (!request_object.class
            || !request_object.access
            || !request_object.method
        ) {
            return resolve(null);
        }

        const name: string = request_object.class;
        if (!name || !packages.has(name)) {
            return resolve(null);
        }

        const CallbackClass: any = packages.get(name);
        const promise: Promise<any> = request_object.access === "static"
            ? Promise.resolve(CallbackClass[request_object.method]())
            : Promise.resolve(new CallbackClass()[request_object.method]());

        return promise
            .then((value: any) =>
            {
                return resolve(value);
            });
    });
};