import { Sprite } from "@next2d/display";
import { execute as defaultLoadingInitializeService } from "./DefaultLoading/service/DefaultLoadingInitializeService";
import { execute as defaultLoaderStartService } from "./DefaultLoading/service/DefaultLoaderStartService";
import { execute as defaultLoaderEndService } from "./DefaultLoading/service/DefaultLoaderEndService";

/**
 * @description デフォルトのローディング演出
 *              Default loading direction
 *
 * @class
 */
export class DefaultLoader
{
    /**
     * @description ローディング演出に使用するSprite
     *              Sprite used for loading direction
     *
     * @type {Sprite}
     * @public
     */
    public readonly sprite: Sprite;

    /**
     * @constructor
     */
    constructor ()
    {
        this.sprite = new Sprite();
        this.initialize();
    }

    /**
     * @description ローディング演出の初期化
     *              Initialization of loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    initialize (): void
    {
        defaultLoadingInitializeService(this);
    }

    /**
     * @description Canvasが設置されたDOMにローディング演出を登録、既にDOMがあれば演出を表示
     *              Register loading direction in the DOM where Canvas is installed,
     *              and display the direction if the DOM already exists.
     *
     * @return {void}
     * @method
     * @public
     */
    start (): void
    {
        defaultLoaderStartService(this);
    }

    /**
     * @description ローディング演出を非表示にする
     *              Hide loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    end (): void
    {
        defaultLoaderEndService(this);
    }
}