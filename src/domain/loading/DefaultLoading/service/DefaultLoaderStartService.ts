import type { DefaultLoader } from "../../DefaultLoader";
import type { Shape } from "@next2d/display";
import type { Job } from "@next2d/ui";
import { $getConfig } from "../../../../application/variable/Config";
import { $getContext } from "../../../../application/variable/Context";
import {
    Tween,
    Easing
} from "@next2d/ui";

/**
 * @description ローダーのアニメーションを実行
 *              Execute loader animation
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

    const config = $getConfig();
    const sprite = default_loader.sprite;

    const minSize  = Math.ceil(Math.min(config.stage.width, config.stage.height) / 100);
    const halfSize = minSize / 2;
    for (let idx = 0; idx < 3; ++idx) {

        const shape = sprite.getChildAt<Shape>(idx);
        if (!shape) {
            continue ;
        }

        /**
         * 初期値を設定
         * Set initial values
         */
        shape.scaleX = 0.1;
        shape.scaleY = 0.1;
        shape.alpha  = 0;

        let reduceJob: Job;
        if (shape.hasLocalVariable("reduceJob")) {
            reduceJob = shape.getLocalVariable("reduceJob") as Job;
            reduceJob.stop();
        } else {
            reduceJob = Tween.add(
                shape,
                {
                    "scaleX": 0.1,
                    "scaleY": 0.1,
                    "alpha": 0
                },
                {
                    "scaleX": 1,
                    "scaleY": 1,
                    "alpha": 1
                },
                0.12,
                0.5,
                Easing.inOutCubic
            );
            shape.setLocalVariable("reduceJob", reduceJob);
        }

        let expandJob: Job;
        if (shape.hasLocalVariable("expandJob")) {
            expandJob = shape.getLocalVariable("expandJob") as Job;
            expandJob.stop();
        } else {
            expandJob = Tween.add(
                shape,
                {
                    "scaleX": 0.1,
                    "scaleY": 0.1,
                    "alpha": 0
                },
                {
                    "scaleX": 1,
                    "scaleY": 1,
                    "alpha": 1
                },
                0.12,
                0.5,
                Easing.inOutCubic
            );
            shape.setLocalVariable("expandJob", expandJob);
        }

        reduceJob.nextJob = expandJob;
        expandJob.nextJob = reduceJob;

        if (idx) {
            setTimeout((): void =>
            {
                expandJob.start();
            }, 120 * idx);
        } else {
            expandJob.start();
        }

        if (shape.width === minSize) {
            continue;
        }

        shape
            .graphics
            .clear()
            .beginFill("#ffffff")
            .drawCircle(0, 0, halfSize);

        shape.x = minSize * 2 * idx;
    }

    sprite.x = (config.stage.width  - sprite.width)  / 2;
    sprite.y = (config.stage.height - sprite.height) / 2;
    root.addChild(sprite);
};