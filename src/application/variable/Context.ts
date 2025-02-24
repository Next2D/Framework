import type { Context } from "../Context";

/**
 * @type {Context}
 * @public
 */
let $context: Context;

/**
 * @description コンテキストを取得します
 *              Get the context
 *
 * @return {Context}
 * @method
 * @protected
 */
export const $getContext = (): Context =>
{
    return $context as NonNullable<Context>;
};

/**
 * @description コンテキストを設定します
 *              Set the context
 *
 * @param {Context} context
 * @method
 * @protected
 */
export const $setContext = (context: Context): void =>
{
    $context = context;
};