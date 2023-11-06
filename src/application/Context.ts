import { execute as toCamelCase } from "../domain/convert/ToCamelCase";
import { packages } from "./variable/Packages";
import type { View } from "../view/View";
import type { ViewModel } from "../view/ViewModel";
import type { Sprite } from "@next2d/display";

/**
 * @description メインコンテキスト、ViewとViewModelのunbind、bindをコントロールします。
 *              Controls unbind and bind of the main context, View and ViewModel.
 *
 * @class
 * @memberof context
 */
export class Context
{
    private _$view: View | null;
    private _$viewModel: ViewModel | null;
    private _$viewName: string;
    private readonly _$root: Sprite;

    /**
     * @param {Sprite} root
     *
     * @constructor
     * @public
     */
    constructor (root: Sprite) {

        /**
         * @type {View}
         * @default null
         * @private
         */
        this._$view = null;

        /**
         * @type {ViewModel}
         * @default null
         * @private
         */
        this._$viewModel = null;

        /**
         * @type {string}
         * @default "Top"
         * @private
         */
        this._$viewName = "Top";

        /**
         * @type {Sprite}
         * @private
         */
        this._$root = root;
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
     * @description 現在のシーンで利用中のViewクラスを返却します。
     *              Returns the View class that is being used in the current scene.
     *
     * @return {View}
     * @default null
     * @readonly
     * @public
     */
    get view (): View | null
    {
        return this._$view;
    }

    /**
     * @description 現在のシーンで利用中のViewModelクラスを返却します。
     *              Returns the ViewModel class that is being used in the current scene.
     *
     * @return {ViewModel}
     * @default null
     * @readonly
     * @public
     */
    get viewModel (): ViewModel | null
    {
        return this._$viewModel;
    }

    /**
     * @description 現在のシーンで利用中のViewクラス名を返却します。
     *              Returns the name of the View class currently being used in the current scene.
     *
     * @return {string}
     * @default "Top"
     * @readonly
     * @public
     */
    get viewName (): string
    {
        return this._$viewName;
    }

    /**
     * @description ViewクラスをrootのSpriteにアタッチします。
     *              Attach the View class to the root Sprite.
     *
     * @param  {string} name
     * @return {Promise<View|void>}
     * @method
     * @public
     */
    async boot (name: string): Promise<View>
    {
        this._$viewName = toCamelCase(name);

        const viewName: string = `${this._$viewName}View`;
        const viewModelName: string = `${viewName}Model`;

        if (!packages.size
            || !packages.has(viewName)
            || !packages.has(viewModelName)
        ) {
            throw new Error("not found view or viewMode.");
        }

        /**
         * 現在のページをstageから削除して、unbind関数を実行
         * Delete current page from stage and execute unbind function
         */
        if (this._$view) {
            if (this._$viewModel) {
                this._$viewModel.unbind(this._$view);
            }

            // remove
            if (this._$view.parent === this._$root) {
                this._$root.removeChild(this._$view);
            }
        }

        /**
         * 遷移先のViewとViewModelを準備
         * Prepare the destination View and ViewModel
         */
        const ViewModelClass: typeof ViewModel = packages.get(viewModelName);
        this._$viewModel = new ViewModelClass();

        const ViewClass: typeof View = packages.get(viewName);
        this._$view = new ViewClass();

        /**
         * ViewModelにViewをbindしてページを生成
         * Bind a View to a ViewModel to generate a page
         */
        await Promise.all([this._$viewModel.bind(this._$view)]);

        /**
         * stageの一番背面にviewをセット
         * Set the view at the very back of the stage
         */
        this._$root.addChildAt(this._$view, 0);

        return this._$view;
    }
}