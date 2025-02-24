import type { DefaultLoader } from "../../DefaultLoader";
import { Shape } from "@next2d/display";

/**
 * @description ローディング演出の初期登録
 *              Initial registration of loading direction
 *
 * @param  {DefaultLoader} default_loader
 * @return {void}
 * @method
 * @protected
 */
export const execute = (default_loader: DefaultLoader): void =>
{
    for (let idx = 0; idx < 3; ++idx) {
        default_loader.sprite.addChild(new Shape());
    }
};