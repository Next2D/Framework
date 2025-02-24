/**
 * @description 外部データをObjectに変換(DTO)、可変性のない使い捨てのクラス
 *              Converts external data to Objects (DTO), non-variable, disposable class
 *
 * @class
 */
export class ResponseDTO
{
    /**
     * @description キャッシュのキー名
     *              Key name of cache
     *
     * @return {string}
     * @default ""
     * @readonly
     * @public
     */
    public readonly name: string;

    /**
     * @description レスポンスデータ
     *              response data
     *
     * @return {*}
     * @default null
     * @readonly
     * @public
     */
    public readonly response: any;

    /**
     * @param {string} [name=""]
     * @param {*} [response=null]
     * @constructor
     * @public
     */
    constructor (name: string = "", response: any = null)
    {
        this.name = name;
        this.response = response;
    }
}