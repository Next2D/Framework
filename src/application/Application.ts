import type { IConfig } from "../interface/IConfig";
import type { IPackages } from "../interface/IPackages";
import type { Context } from "./Context";
import { execute as applicationInitializeService } from "./Application/service/ApplicationInitializeService";
import { execute as applicationGotoViewUseCase } from "./Application/usecase/ApplicationGotoViewUseCase";
import { execute as contextRunService } from "./Context/service/ContextRunService";
import { $getConfig } from "./variable/Config";
import { $getContext } from "./variable/Context";
import { response } from "../infrastructure/Response/variable/Response";
import { cache } from "./variable/Cache";

/**
 * @description シーン遷移のコントロールを行うクラス。
 *              Class for controlling scene transitions.
 *
 * @class
 */
export class Application
{
    /**
     * @description SPAの遷移かどうかを判定します
     *             Determines whether it is a transition of SPA
     *
     * @type {boolean}
     * @default false
     * @public
     */
    public popstate: boolean;

    /**
     * @description 現在の画面名
     *             Current screen name
     *
     * @type {string}
     * @default ""
     * @public
     */
    public currentName: string;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        this.popstate    = false;
        this.currentName = "";
    }

    /**
     * @description 初期起動関数
     *              initial invoking function
     *
     * @return {Application}
     * @method
     * @public
     */
    initialize (config: IConfig, packages: IPackages): Application
    {
        return applicationInitializeService(this, config, packages);
    }

    /**
     * @description Next2Dのアプリを起動します
     *              Launch the Next2D application
     *
     * @return {Promise<void>}
     * @method
     * @public
     */
    async run (): Promise<void>
    {
        await contextRunService($getConfig());
    }

    /**
     * @description 指定のViewを起動して、描画を開始します。引数を指定しない場合はURLをパースしてViewを起動します。
     *              Launches the specified View and starts drawing. If no argument is specified,
     *              the URL will be parsed and the View will be launched.
     *
     * @param  {string} [name=""]
     * @return {Promise<void>}
     * @method
     * @public
     */
    async gotoView (name: string = ""): Promise<void>
    {
        await applicationGotoViewUseCase(this, name);
    }

    /**
     * @description コンテキストを取得します
     *              Get the context
     *
     * @return {Context}
     * @method
     * @public
     */
    getContext (): Context
    {
        return $getContext();
    }

    /**
     * @description configで設定したリクエストのレスポンスマップを返却します
     *              Returns the response map of the request set in config
     *
     * @return {Map<string, any>}
     * @method
     * @public
     */
    getResponse (): Map<string, any>
    {
        return response;
    }

    /**
     * @description キャッシュのMapオブジェクトを返却します
     *              Returns the Map object of the cache
     *
     * @return {Map<string, any>}
     * @method
     * @public
     */
    getCache (): Map<string, any>
    {
        return cache;
    }
}