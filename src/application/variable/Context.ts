import { Context } from "../Context";
import type { Sprite } from "@next2d/display";
import type { ConfigImpl } from "../../interface/ConfigImpl";

/**
 * @type {Context}
 * @public
 */
export let context: Context;

/**
 * @param  {object} config
 * @return {void}
 * @method
 * @private
 */
export const $createContext = async (config: ConfigImpl): Promise<void> =>
{
    const root: Sprite = await window
        .next2d
        .createRootMovieClip(
            config.stage.width,
            config.stage.height,
            config.stage.fps,
            config.stage.options
        );

    context = new Context(root);
};