/**
 * リクエストタイプの定数
 * Request Type Constants
 *
 * @class
 * @memberof infrastructure.constant
 */
export class RequestType
{
    /**
     * @description リクエストの集合体
     *              Aggregation of requests.
     *
     * @return  {string}
     * @default "cluster"
     * @const
     * @static
     */
    static get CLUSTER (): string
    {
        return "cluster";
    }

    /**
     * @description NoCode Toolで書き出したJSONコンテンツ
     *              JSON content exported by NoCode Tool.
     *
     * @return  {string}
     * @default "content"
     * @const
     * @static
     */
    static get CONTENT (): string
    {
        return "content";
    }

    /**
     * @description カスタムリクエストタイプ
     *              custom request type.
     *
     * @return  {string}
     * @default "custom"
     * @const
     * @static
     */
    static get CUSTOM (): string
    {
        return "custom";
    }

    /**
     * @description JSONのフォーマットを指定
     *              Specify JSON format.
     *
     * @return  {string}
     * @default "json"
     * @const
     * @static
     */
    static get JSON (): string
    {
        return "json";
    }
}
