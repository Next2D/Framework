import { RequestType } from "../constant/RequestType";
import { ContentService } from "../service/ContentService";
import { CustomService } from "../service/CustomService";
import { JsonService } from "../service/JsonService";
import { Callback } from "../../domain/callback/Callback";
import { RequestParser } from "../../domain/parser/RequestParser";
import { ConfigParser } from "../../domain/parser/ConfigParser";
import { ResponseDTO } from "../dto/ResponseDTO";

interface Object {
    type: string;
    name: string;
    path: string;
    cache?: boolean;
    class: string;
    access: string;
    method: string;
    callback?: string | string[];
}

/**
 * ページの切り替え時の外部リクエストクラス
 * External request class when switching pages
 *
 * @class
 * @memberof infrastructure.usecase
 */
export class RequestUseCase
{
    private readonly _$callback: Callback;
    private readonly _$contentService: ContentService;
    private readonly _$customService: CustomService;
    private readonly _$jsonService: JsonService;
    private readonly _$requestParser: RequestParser;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {Callback}
         * @private
         */
        this._$callback = new Callback();

        /**
         * @type {ContentService}
         * @private
         */
        this._$contentService = new ContentService();

        /**
         * @type {CustomService}
         * @private
         */
        this._$customService = new CustomService();

        /**
         * @type {JsonService}
         * @private
         */
        this._$jsonService = new JsonService();

        /**
         * @type {RequestParser}
         * @private
         */
        this._$requestParser = new RequestParser();
    }

    /**
     * @description Routing設定で指定したタイプへリクエストを実行
     *              Execute requests to the type specified in Routing settings
     *
     * @param  {string} name
     * @return {Promise}
     * @method
     * @public
     */
    execute (name: string): Promise<ResponseDTO>[]
    {
        // @ts-ignore
        const parser: ConfigParser = next2d.fw.parser;

        const promises: Promise<ResponseDTO>[] = [];
        const requests: Object[] = this._$requestParser.execute(name);
        for (let idx: number = 0; idx < requests.length; ++idx) {

            const object: Object = requests[idx];
            switch (parser.execute(object.type)) {

                case RequestType.CUSTOM:
                    promises.push(
                        this._$customService.execute(object)
                    );
                    break;

                case RequestType.JSON:
                    promises.push(
                        this._$jsonService.execute(object)
                    );
                    break;

                case RequestType.CONTENT:
                    promises.push(this._$contentService.execute(object));
                    break;

            }
        }

        return promises;
    }
}