import type { IRequest } from "../../../interface/IRequest";
import type { IRouting } from "../../../interface/IRouting";
import { $getConfig } from "../../../application/variable/Config";

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
export const execute = (name: string): IRequest[] =>
{
    const requests: IRequest[] = [];

    const config = $getConfig();
    if (!config || !config.routing) {
        return requests;
    }

    const routing: IRouting = config.routing[name];
    if (!routing || !routing.requests) {
        return requests;
    }

    for (let idx: number = 0; idx < routing.requests.length; idx++) {

        const request: IRequest = routing.requests[idx];

        if (request.type !== "cluster") {
            requests.push(request);
            continue;
        }

        if (!request.path) {
            continue;
        }

        /**
         * クラスターの場合は分解して配列に追加
         * For clusters, disassemble and add to array
         */
        const results: IRequest[] = execute(request.path);
        requests.push(...results);
    }

    return requests;
};