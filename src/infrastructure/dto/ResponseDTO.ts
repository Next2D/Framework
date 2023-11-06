/**
 * @description 外部データをObjectに変換(DTO)、可変性のない使い捨てのクラス
 *              Converts external data to Objects (DTO), non-variable, disposable class
 *
 * @class
 * @memberof infrastructure.dto
 */
export class ResponseDTO
{
    private readonly _$name: string;
    private readonly _$response: any;

    /**
     * @param {string} [name=""]
     * @param {*} [response=null]
     * @constructor
     * @public
     */
    constructor (name: string = "", response: any = null)
    {
        /**
         * @type {string}
         * @default ""
         * @private
         */
        this._$name = name;

        /**
         * @type {*}
         * @default null
         * @private
         */
        this._$response = response;
    }

    /**
     * @description キャッシュのキー名
     *              Key name of cache
     *
     * @return {string}
     * @default ""
     * @readonly
     * @public
     */
    get name (): string
    {
        return this._$name;
    }

    /**
     * @description レスポンスデータ
     *              response data
     *
     * @return {*}
     * @default null
     * @readonly
     * @public
     */
    get response (): any | null
    {
        return this._$response;
    }
}