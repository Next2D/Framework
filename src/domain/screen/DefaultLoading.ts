import { context } from "../../application/variable/Context";
import { config } from "../../application/variable/Config";
import { Sprite, Shape } from "@next2d/display";
import { Tween, Job, Easing } from "@next2d/ui";
import { Event } from "@next2d/events";

/**
 * @type {Sprite}
 * @private
 */
const $sprite: Sprite = new Sprite();

/**
 * @return {object}
 * @method
 * @private
 */
const getStartObject = (): object => {
    return {
        "scaleX": 0.1,
        "scaleY": 0.1,
        "alpha": 0
    };
};

/**
 * @return {object}
 * @method
 * @private
 */
const getEndObject = (): object => {
    return {
        "scaleX": 1,
        "scaleY": 1,
        "alpha": 1
    };
};

/**
 * @description ローディングのアニメーションに必要なDisplayObjectを追加
 *              Add DisplayObject needed for loading animation
 *
 * @return {void}
 * @method
 * @private
 */
const initialize = (): void =>
{
    for (let idx: number = 0; idx < 3; ++idx) {

        const sprite: Sprite = new Sprite();
        sprite.addChild(new Shape());

        const reduceJob: Job = Tween.add(
            sprite,
            getEndObject(),
            getStartObject(),
            0.2,
            0.7,
            Easing.inOutCubic
        );
        sprite.setLocalVariable("reduceJob", reduceJob);

        const expandJob: Job = Tween.add(
            sprite,
            getStartObject(),
            getEndObject(),
            0.2,
            0.7,
            Easing.inOutCubic
        );
        sprite.setLocalVariable("expandJob", expandJob);

        // loop event
        reduceJob.addEventListener(Event.COMPLETE, () =>
        {
            const expandJob: Job = sprite.getLocalVariable("expandJob");
            expandJob.from = getStartObject();
            expandJob.to   = getEndObject();
            expandJob.start();
        });

        // loop event
        expandJob.addEventListener(Event.COMPLETE, () =>
        {
            const reduceJob: Job = sprite.getLocalVariable("reduceJob");
            reduceJob.from = getEndObject();
            reduceJob.to   = getStartObject();
            reduceJob.start();
        });

        $sprite.addChild(sprite);
    }
};
initialize();

/**
 * @class
 * @memberof domain.screen
 */
export class DefaultLoading
{
    /**
     * @description Canvasが設置されたDOMにローディング演出を登録、既にDOMがあれば演出を表示
     *              Register loading direction in the DOM where Canvas is installed,
     *              and display the direction if the DOM already exists.
     *
     * @return {void}
     * @method
     * @public
     */
    start (): void
    {
        const minSize: number = Math.ceil(Math.min(config.stage.width, config.stage.height) / 100);
        const halfSize: number = minSize / 2;
        for (let idx: number = 0; idx < 3; ++idx) {

            const sprite: Sprite = $sprite.getChildAt(idx);

            /**
             * 初期値を設定
             * Set initial values
             */
            sprite.scaleX = 0.1;
            sprite.scaleY = 0.1;
            sprite.alpha  = 0;

            const reduceJob: Job = sprite.getLocalVariable("reduceJob");
            // reset
            reduceJob.from = getEndObject();
            reduceJob.to   = getStartObject();

            const expandJob: Job = sprite.getLocalVariable("expandJob");
            // reset
            expandJob.from = getStartObject();
            expandJob.to   = getEndObject();

            if (idx) {
                setTimeout((): void =>
                {
                    expandJob.start();
                }, 200 * idx);
            } else {
                expandJob.start();
            }

            const shape: Shape = sprite.getChildAt(0);
            if (shape.width === minSize) {
                continue;
            }

            shape
                .graphics
                .clear()
                .beginFill("#ffffff")
                .drawCircle(0, 0, halfSize);

            sprite.x = minSize * 2 * idx;
        }

        $sprite.x = (config.stage.width  - $sprite.width)  / 2;
        $sprite.y = (config.stage.height - $sprite.height) / 2;
        context.root.addChild($sprite);
    }

    /**
     * @description ローディング演出を非表示にする
     *              Hide loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    end (): void
    {
        // stop job
        for (let idx: number = 0; idx < 3; ++idx) {
            const sprite: Sprite = $sprite.getChildAt(idx);

            const expandJob: Job = sprite.getLocalVariable("expandJob");
            expandJob.stop();

            const reduceJob: Job = sprite.getLocalVariable("reduceJob");
            reduceJob.stop();
        }

        if ($sprite.parent === context.root) {
            context.root.removeChild($sprite);
        }
    }
}