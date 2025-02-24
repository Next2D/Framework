import type { IConfig } from "../../interface/IConfig";

/**
 * @type {IConfig}
 * @private
 */
let $config: IConfig;

/**
 * @description 環境設定として書き出ししたobjectをセットします
 *              Set the object written as environment settings
 *
 * @param  {IConfig} object
 * @return {void}
 * @method
 * @protected
 */
export const $setConfig = (object: IConfig): void =>
{
    $config = object;
};

/**
 * @description 環境設定としてセットされたobjectを返却します
 *              Returns the object set as environment settings
 *
 * @return {IConfig}
 * @method
 * @protected
 */
export const $getConfig = (): IConfig =>
{
    return $config;
};