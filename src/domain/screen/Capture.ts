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
            // @ts-ignore
            const context: any = next2d.fw.context;

            // @ts-ignore
            const root: any = context.root;

            // @ts-ignore
            const { Shape } = next2d.display;

            // @ts-ignore
            const config: any = next2d.fw.config;

            const width: number  = config.stage.width;
            const height: number = config.stage.height;

            const mask: any = new Shape();
            mask
                .graphics
                .beginFill(0, 0.8)
                .drawRect(0, 0, width, height)
                .endFill();

            const player: any = root.stage._$player;
            const matrix: any = player._$matrix;

            const tx: number = matrix[4];
            if (tx) {
                const scaleX: number = matrix[0];
                mask.scaleX = (width + tx * 2 / scaleX) / width;
                mask.x = -tx / scaleX;
            }

            const ty: number = matrix[5];
            if (ty) {
                const scaleY: number = matrix[3];
                mask.scaleY = (height + ty * 2 / scaleY) / height;
                mask.y = -ty / scaleY;
            }

            root.mouseChildren = false;
            root.addChild(mask);

            setTimeout(() =>
            {
                resolve();
            }, 350);
        });
    }
}