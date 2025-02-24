import { $getContext } from "../../../../application/variable/Context";

/**
 * @description 画面キャプチャーのShapeをStageから削除
 *              Delete Screen Capture Shape from Stage
 *
 * @return {void}
 * @method
 * @protected
 */
export const execute = (): void =>
{
    const root = $getContext().root;
    if (!root) {
        return ;
    }

    /**
     * rootの子要素を全て削除
     * Remove all child elements of root
     */
    while (root.numChildren > 0) {
        root.removeChildAt(0);
    }

    /**
     * マウス操作を有効化
     * Enable Mouse Operation
     */
    root.mouseChildren = true;
};