import { $getConfig } from "../../../../application/variable/Config";
import { $getContext } from "../../../../application/variable/Context";
import { Matrix } from "@next2d/geom";
import { shape } from "../../Capture";
import {
    stage,
    BitmapData,
    Shape
} from "@next2d/display";

/**
 * @type {number}
 * @private
 */
let $cacheX: number = 0;

/**
 * @type {number}
 * @private
 */
let $cacheY: number = 0;

/**
 * @description 画面キャプチャーのShapeをStageに追加
 *              Add Screen Capture Shape to Stage
 *
 * @return {void}
 * @method
 * @protected
 */
export const execute = async (): Promise<void> =>
{
    const root = $getContext().root;
    if (!root) {
        return ;
    }

    /**
     * マウス操作を強制停止
     * Mouse operation is forced to stop
     */
    root.mouseChildren = false;

    const canvas = await next2d.captureToCanvas(root, {
        "matrix": new Matrix(stage.rendererScale, 0, 0, stage.rendererScale, 0, 0)
    });

    const rectangle  = root.getBounds();
    const bitmapData = new BitmapData(canvas.width, canvas.height);

    bitmapData.canvas = canvas;

    const bitmap = new Shape();
    bitmap.x = rectangle.x;
    bitmap.y = rectangle.y;
    if (stage.rendererScale !== 1) {
        bitmap.scaleX = 1 / stage.rendererScale;
        bitmap.scaleY = 1 / stage.rendererScale;
    }

    bitmap.setBitmapBuffer(
        canvas.width, canvas.height,
        bitmapData.buffer as Uint8Array
    );

    root.addChild(bitmap);

    const config = $getConfig();
    const width  = config.stage.width;
    const height = config.stage.height;
    if (shape.width !== width || shape.width !== height) {
        shape
            .graphics
            .clear()
            .beginFill(0, 0.8)
            .drawRect(0, 0, width, height)
            .endFill();
    }

    const scale = stage.rendererScale;

    const tx = (stage.rendererWidth  - stage.stageWidth * scale) / 2;
    if (tx && $cacheX !== tx) {
        $cacheX = tx;
        shape.scaleX = (width + tx * 2 / scale) / width;
        shape.x = -tx / scale;
    }

    const ty = (stage.rendererHeight - stage.stageHeight * scale) / 2;
    if (ty && $cacheY !== ty) {
        $cacheY = ty;
        shape.scaleY = (height + ty * 2 / scale) / height;
        shape.y = -ty / scale;
    }

    root.addChild(shape);
};