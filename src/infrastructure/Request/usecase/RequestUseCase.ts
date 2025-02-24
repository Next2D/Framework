import type { ResponseDTO } from "../../Response/dto/ResponseDTO";
import { execute as requestContentRepository } from "../repository/RequestContentRepository";
import { execute as requestCustomRepository } from "../repository/RequestCustomRepository";
import { execute as requestJsonRepository } from "../repository/RequestJsonRepository";
import { execute as configParserRequestsPropertyService } from "../../../application/Config/service/ConfigParserRequestsPropertyService";

/**
 * @description Routing設定で指定したタイプへリクエストを実行
 *              Execute requests to the type specified in Routing settings
 *
 * @param  {string} name
 * @return {Promise<ResponseDTO[]>}
 * @method
 * @public
 */
export const execute = async (name: string): Promise<ResponseDTO[]> =>
{
    const responses: ResponseDTO[] = [];
    const requests = configParserRequestsPropertyService(name);
    for (let idx = 0; idx < requests.length; ++idx) {

        const requestObject = requests[idx];
        switch (requestObject.type) {

            case "json":
                {
                    const response = await requestJsonRepository(requestObject);
                    if (!response) {
                        continue;
                    }
                    responses.push(response);
                }
                break;

            case "content":
                {
                    const response = await requestContentRepository(requestObject);
                    if (!response) {
                        continue;
                    }
                    responses.push(response);
                }
                break;

            case "custom":
                {
                    const response = await requestCustomRepository(requestObject);
                    if (!response) {
                        continue;
                    }
                    responses.push(response);
                }
                break;

            default:
                break;

        }
    }

    return responses;
};