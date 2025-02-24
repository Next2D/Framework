import type { DefaultLoader } from "../../DefaultLoader";
import type { Shape } from "@next2d/display";
import type { Job } from "@next2d/ui";
import { $getContext } from "../../../../application/variable/Context";

/**
 * @description ローダーのアニメーションを終了
 *              End loader animation
 *
 * @param  {DefaultLoader} default_loader
 * @return {void}
 * @method
 * @protected
 */
export const execute = (default_loader: DefaultLoader): void =>
{
    const root = $getContext().root;
    if (!root) {
        return ;
    }

    const sprite = default_loader.sprite;
    for (let idx = 0; idx < 3; ++idx) {

        const shape = sprite.getChildAt<Shape>(idx);
        if (!shape) {
            continue ;
        }

        if (shape.hasLocalVariable("expandJob")) {
            const expandJob = shape.getLocalVariable("expandJob") as Job;
            expandJob.stop();
        }

        if (shape.hasLocalVariable("reduceJob")) {
            const reduceJob = shape.getLocalVariable("reduceJob") as Job;
            reduceJob.stop();
        }
    }

    root.removeChild(sprite);
};