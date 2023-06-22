import type { ViewImpl } from "../interface/ViewImpl";

/**
 * ViewModelの親クラス、抽象クラスとして存在しています。
 * It exists as a parent class of ViewModel and as an abstract class.
 *
 * @class
 * @memberof view
 */
export class ViewModel
{
    /**
     * @description rootのSpriteにアタッチされたタイミングでコールされます。
     *              Called at the timing when the root Sprite is attached.
     *
     * @param  {View} view
     * @return {Promise<View>}
     * @method
     * @abstract
     */
    bind (view: ViewImpl<any>): Promise<ViewImpl<any>>
    {
        return this.factory(view);
    }

    /**
     * @description 新しいViewクラスがアタッチされる前にコールされます。
     *              Called before a new View class is attached.
     *
     * @param  {View} view
     * @return {void}
     * @method
     * @public
     */
    // eslint-disable-next-line no-unused-vars,no-empty-function
    unbind (view: ViewImpl<any>): void {}

    /**
     * @description bind関数で非同期で処理を開始する共通関数です。
     *              Common function to start processing asynchronously with bind functions.
     *
     * @param  {View} view
     * @return {Promise<View>}
     * @method
     * @public
     */
    factory (view: ViewImpl<any>): Promise<ViewImpl<any>>
    {
        return new Promise((resolve) =>
        {
            requestAnimationFrame(() => {
                return resolve(view);
            });
        });
    }
}
