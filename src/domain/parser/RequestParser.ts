import { RequestType } from "../../infrastructure/constant/RequestType";
import { config } from "../../application/variable/Config";
import type { RequestTypeImpl } from "../../interface/RequestTypeImpl";

interface Object {
    type: RequestTypeImpl;
    name: string;
    path: string;
    cache: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string | string[];
}

/**
 * @class
 * @memberof domain.parser
 */
export class RequestParser
{
    /**
     * @description routing.jsonに設定されたrequestsを返却します。
     *              クラスターの指定があった場合は返却する配列にマージして返却
     *              Returns requests set in routing.json.
     *              If a cluster is specified, it is merged into the array to be returned
     *
     * @param  {string} name
     * @return {array}
     * @method
     * @public
     */
    execute (name: string): Object[]
    {
        if (!config || !config.routing) {
            return [];
        }

        const routing: any = config.routing[name];
        if (!routing || !routing.requests) {
            return [];
        }

        const requests: Object[] = [];
        for (let idx = 0; idx < routing.requests.length; idx++) {

            const object: Object = routing.requests[idx];

            if (object.type !== RequestType.CLUSTER) {
                requests.push(object);
                continue;
            }

            const results: Object[] = new RequestParser().execute(object.path);
            for (let idx = 0; idx < results.length; ++idx) {
                requests.push(results[idx]);
            }
        }

        return requests;
    }
}