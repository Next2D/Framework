import type { ResponseDTO } from "../../Response/dto/ResponseDTO";
import type { IRequest } from "src/interface/IRequest";
import { execute as contentService } from "../service/ContentService";
import { execute as customService } from "../service/CustomService";
import { execute as jsonService } from "../service/JsonService";
import { execute as requestParser } from "../service/RequestParser";

/**
 * @description Routing設定で指定したタイプへリクエストを実行
 *              Execute requests to the type specified in Routing settings
 *
 * @param  {string} name
 * @return {Promise}
 * @method
 * @public
 */
export const execute = (name: string): Promise<ResponseDTO>[] =>
{
    const promises: Promise<ResponseDTO>[] = [];
    const requests: IRequest[] = requestParser(name);
    for (let idx = 0; idx < requests.length; ++idx) {

        const requestObject: IRequest = requests[idx];
        switch (requestObject.type) {

            case "custom":
                promises.push(customService(requestObject));
                break;

            case "json":
                promises.push(jsonService(requestObject));
                break;

            case "content":
                promises.push(contentService(requestObject));
                break;

            default:
                break;
        }
    }

    return promises;
};