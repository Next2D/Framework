import { config } from "../../application/variable/Config";
import { context } from "../../application/variable/Context";
import { $currentPlayer } from "@next2d/util";
import { Shape } from "@next2d/display";
import type { Sprite } from "@next2d/display";
import type { Player } from "@next2d/core";

/**
 * @type {Shape}
 * @private
 */
const shape: Shape = new Shape();

/**
 * @type {number}
 * @default 0
 * @private
 */
let cacheX: number = 0;

/**
 * @type {number}
 * @default 0
 * @private
 */
let cacheY: number = 0;

/**
 * @description 現時点の描画キャプチャーを生成
 *              Generate current drawing capture
 *
 * @return {Promise<void>}
 * @method
 * @public
 */
export const execute = (): Promise<void> =>
{
    return new Promise((resolve) =>
    {
        const width: number  = config.stage.width;
        const height: number = config.stage.height;
        if (shape.width !== width || shape.width !== height) {
            shape
                .graphics
                .clear()
                .beginFill(0, 0.8)
                .drawRect(0, 0, width, height)
                .endFill();
        }

        const player: Player = $currentPlayer();

        const tx: number = player.x;
        if (tx && cacheX !== tx) {
            cacheX = tx;
            const scaleX: number = player.scaleX;
            shape.scaleX = (width + tx * 2 / scaleX) / width;
            shape.x = -tx / scaleX;
        }

        const ty: number = player.y;
        if (ty && cacheY !== ty) {
            cacheY = ty;
            const scaleY: number = player.scaleY;
            shape.scaleY = (height + ty * 2 / scaleY) / height;
            shape.y = -ty / scaleY;
        }

        const root: Sprite = context.root;
        if (root) {
            /**
             * マウス操作を強制停止
             * Mouse operation is forced to stop
             */
            root.mouseChildren = false;
            root.addChild(shape);
        }

        resolve();
    });
};

/**
 * @description 画面キャプチャーのShapeをStageから削除
 *              Delete Screen Capture Shape from Stage
 *
 * @return {void}
 * @method
 * @public
 */
export const dispose = (): void =>
{
    const root: Sprite = context.root;
    if (root) {

        if (shape.parent === root) {
            root.removeChild(shape);
        }

        /**
         * マウス操作を有効化
         * Enable Mouse Operation
         */
        root.mouseChildren = true;
    }
};