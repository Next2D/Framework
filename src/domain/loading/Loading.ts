import type { ILoading } from "src/interface/ILoading";

/**
 * @type {object}
 * @default null
 * @private
 */
let $instance: ILoading | null = null;

/**
 * @description ローダーのインスタンスを取得
 *              Get loader instance
 *
 * @return {ILoading}
 * @method
 * @public
 */
export const $getInstance = (): ILoading =>
{
    return $instance as ILoading;
};

/**
 * @description ローダーのインスタンスを設定
 *              Set loader instance
 *
 * @param {ILoading} instance
 * @return {void}
 * @method
 * @public
 */
export const $setInstance = (instance: ILoading): void =>
{
    $instance = instance;
};