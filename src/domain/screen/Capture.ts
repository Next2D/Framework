import { config } from "../../application/variable/Config";
import { context } from "../../application/variable/Context";
import { $currentPlayer } from "@next2d/player/dist/player/util/Util";
import { Shape } from "@next2d/player/dist/player/next2d/display/Shape";
import type { Sprite } from "@next2d/player/dist/player/next2d/display/Sprite";
import type { Player } from "@next2d/player/dist/player/player/Player";
/**
 * @class
 * @memberof domain.screen
 */
export class Capture
{
    /**
     * @description 現時点の描画キャプチャーを生成
     *              Generate current drawing capture
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    execute (): Promise<void>
    {
        return new Promise((resolve) =>
        {
            const width: number  = config.stage.width;
            const height: number = config.stage.height;

            const mask: any = new Shape();
            mask
                .graphics
                .beginFill(0, 0.8)
                .drawRect(0, 0, width, height)
                .endFill();

            const player: Player = $currentPlayer();

            const tx: number = player.x;
            if (tx) {
                const scaleX: number = player.scaleX;
                mask.scaleX = (width + tx * 2 / scaleX) / width;
                mask.x = -tx / scaleX;
            }

            const ty: number = player.y;
            if (ty) {
                const scaleY: number = player.scaleY;
                mask.scaleY = (height + ty * 2 / scaleY) / height;
                mask.y = -ty / scaleY;
            }

            const root: Sprite = context.root;
            if (root) {
                root.mouseChildren = false;
                root.addChild(mask);
            }

            setTimeout(() =>
            {
                resolve();
            }, 350);
        });
    }
}