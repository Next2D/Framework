import type { View } from "./View";

/**
 * @description ViewModelの親クラス、抽象クラスとして存在しています。
 *              It exists as a parent class of ViewModel and as an abstract class.
 *
 * @class
 */
export class ViewModel
{
    /**
     * @description rootのSpriteにアタッチされたタイミングでコールされます。
     *              Called at the timing when the root Sprite is attached.
     *
     * @param  {View} view
     * @return {Promise<void>}
     * @method
     * @abstract
     */
    // @ts-ignore
    // eslint-disable-next-line unused-imports/no-unused-vars
    async bind (view: View): Promise<void> { return void 0 }

    /**
     * @description 新しいViewクラスがアタッチされる前にコールされます。
     *              Called before a new View class is attached.
     *
     * @param  {View} view
     * @return {Promise<View>}
     * @method
     * @abstract
     */
    async unbind (view: View): Promise<View>
    {
        return view;
    }
}