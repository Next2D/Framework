import { ToCamelCase } from "../domain/convert/ToCamelCase";
import { Event } from "@next2d/player/dist/player/next2d/events/Event";
import { packages } from "./variable/Packages";
import type { View } from "../view/View";
import type { ViewModel } from "../view/ViewModel";
import type { Sprite } from "@next2d/player/dist/player/next2d/display/Sprite";

/**
 * メインコンテキスト、ViewとViewModelのunbind、bindをコントロールします。
 * Controls unbind and bind of the main context, View and ViewModel.
 * @class
 * @memberof application
 */
export class Context
{
    private _$view: View | null;
    private _$viewModel: ViewModel | null;
    private _$viewName: string;
    private readonly _$root: Sprite;
    private readonly _$toCamelCase: ToCamelCase;

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
         * @default null
         * @private
         */
        this._$root = root;

        /**
         * @type {ToCamelCase}
         * @private
         */
        this._$toCamelCase = new ToCamelCase();
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
    addChild (name: string): Promise<View | void>
    {
        this._$viewName = this._$toCamelCase.execute(name);

        const viewName: string      = `${this._$viewName}View`;
        const viewModelName: string = `${viewName}Model`;

        if (!packages.size
            || !packages.has(viewName)
            || !packages.has(viewModelName)
        ) {
            return Promise.resolve();
        }

        const ViewModelClass: typeof ViewModel = packages.get(viewModelName);
        this._$viewModel = new ViewModelClass();

        const ViewClass: typeof View = packages.get(viewName);
        this._$view = new ViewClass();

        this._$view.addEventListener(Event.REMOVED, (event: any) =>
        {
            if (this._$viewModel) {
                this._$viewModel.unbind(event.target);
            }
        });

        return Promise
            .all([this._$viewModel.bind(this._$view)])
            .then(() =>
            {
                if (!this._$view) {
                    return ;
                }

                const root: Sprite | null = this._$root;
                if (!root) {
                    throw new Error("the root is null.");
                }

                root.addChild(this._$view);

                while (root.numChildren > 1) {
                    root.removeChild(root.getChildAt(0));
                }

                root.mouseChildren = true;

                return this._$view;
            });
    }
}