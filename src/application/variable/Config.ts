import { ConfigImpl } from "../../interface/ConfigImpl";

/**
 * @type {object}
 * @public
 */
export let config: ConfigImpl;

/**
 * @param  {object} object
 * @return {void}
 * @method
 * @private
 */
export const $setConfig = (object: ConfigImpl): void =>
{
    config = object;
};