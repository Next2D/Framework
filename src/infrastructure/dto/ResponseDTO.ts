/**
 * 外部データをObjectに変換(DTO)、可変性はない使い捨てのクラス
 * Converts external data to Object (DTO), disposable class with no variability
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
     * @description キャッシュする場合のキー名
     *              Key name if caching
     *
     * @return {string}
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
     * @readonly
     * @public
     */
    get response (): any
    {
        return this._$response;
    }
}