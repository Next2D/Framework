import type { View } from "../view/View";
import type { ViewModel } from "../view/ViewModel";
import type { Sprite } from "@next2d/display";
import { execute as contextUnbindService } from "./Context/service/ContextUnbindService";
import { execute as contextBindUseCase } from "./Context/usecase/ContextBindUseCase";

/**
 * @description メインコンテキスト、ViewとViewModelのunbind、bindをコントロールします。
 *              Controls unbind and bind of the main context, View and ViewModel.
 *
 * @class
 */
export class Context
{
    /**
     * @description 現在のシーンで利用中のViewクラスを返却します。
     *              Returns the View class that is being used in the current scene.
     *
     * @return {View}
     * @default null
     * @public
     */
    public view: View | null;

    /**
     * @description 現在のシーンで利用中のViewModelクラスを返却します。
     *              Returns the ViewModel class that is being used in the current scene.
     *
     * @return {ViewModel}
     * @default null
     * @public
     */
    public viewModel: ViewModel | null;

    /**
     * @type {Sprite}
     * @private
     */
    private readonly _$root: Sprite;

    /**
     * @param {Sprite} root
     *
     * @constructor
     * @public
     */
    constructor (root: Sprite) {

        this._$root = root;

        // 初期化
        this.view      = null;
        this.viewModel = null;
    }

    /**
     * @description StageクラスにセットされたrootのSpriteを返却します。
     *              Returns the Sprite of the root set in the Stage class.
     *
     * @return {Sprite}
     * @readonly
     * @public
     */
    get root (): Sprite
    {
        return this._$root;
    }

    /**
     * @description ViewクラスをrootのSpriteにアタッチします。
     *              Attach the View class to the root Sprite.
     *
     * @param {string} name
     * @return {Promise<View>}
     * @method
     * @public
     */
    async bind (name: string): Promise<View>
    {
        return await contextBindUseCase(this, name);
    }

    /**
     * @description ViewとViewModelのバインドを解除します。
     *              Unbinds View and ViewModel.
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    async unbind (): Promise<void>
    {
        await contextUnbindService(this);
    }
}