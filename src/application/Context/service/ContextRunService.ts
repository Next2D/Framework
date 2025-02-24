import type { IConfig } from "../../../interface/IConfig";
import { Context } from "../../Context";
import { $setContext } from "../../variable/Context";

/**
 * @description コンテキストを起動します。
 *              Start the context.
 *
 * @param  {IConfig} config
 * @return {Promise<void>}
 * @method
 * @protected
 */
export const execute = async (config: IConfig): Promise<void> =>
{
    const root = await next2d.createRootMovieClip(
        config.stage.width,
        config.stage.height,
        config.stage.fps,
        config.stage.options
    );

    $setContext(new Context(root));
};