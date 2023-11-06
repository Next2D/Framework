import type { ResponseDTO } from "../infrastructure/dto/ResponseDTO";
import type { View } from "../view/View";
import type { ConfigImpl } from "../interface/ConfigImpl";
import type { QueryObjectImpl } from "../interface/QueryObjectImpl";
import { execute as queryParser } from "../domain/parser/QueryParser";
import { execute as requestUseCase } from "../infrastructure/usecase/RequestUseCase";
import { execute as callback } from "../domain/callback/Callback";
import {
    execute as captureExecute,
    dispose as captureDispose
} from "../domain/screen/Capture";
import { execute as removeResponse } from "./service/RemoveResponse";
import { $setPackages } from "./variable/Packages";
import { response } from "./variable/Response";
import {
    config,
    $setConfig
} from "./variable/Config";
import {
    context,
    $createContext
} from "./variable/Context";
import {
    start as loadingStart,
    end as loadingEnd
} from "../domain/loading/Loading";

/**
 * シーン遷移のコントロールを行うクラス。
 * Class for controlling scene transitions.
 *
 * @class
 * @memberof application
 */
export class Application
{
    private _$popstate: boolean;
    private _$currentName: string;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {boolean}
         * @default false
         * @private
         */
        this._$popstate = false;

        /**
         * @type {string}
         * @default "top"
         * @private
         */
        this._$currentName = "top";
    }

    /**
     * @description 初期起動関数
     *              initial invoking function
     *
     * @return {Application}
     * @method
     * @public
     */
    initialize (config: ConfigImpl, packages: any[]): Application
    {
        $setConfig(config);
        $setPackages(packages);

        /**
         * SPAが有効の場合は、遷移の履歴を残す
         * Keep history of transitions if SPA setting is enabled
         */
        if (config.spa) {
            window.addEventListener("popstate", (): void =>
            {
                this._$popstate = true;
                this.gotoView();
            });
        }

        return this;
    }

    /**
     * @description Next2Dのアプリを起動します
     *              Launch the Next2D application
     *
     * @return {Promise}
     * @method
     * @public
     */
    run (): Promise<void>
    {
        return $createContext(config);
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
        if (config.loading) {

            const promises: Promise<void>[] = [];

            /**
             * 現時点の描画をBitmapにして処理の負担を減らす
             * Reduce the processing burden by making the current drawing a Bitmap.
             */
            promises.push(captureExecute());

            /**
             * ローディング表示を起動
             * Launch loading display
             */
            promises.push(loadingStart());

            await Promise.all(promises);
        }

        /**
         * 前の画面で取得したレスポンスデータを初期化
         * Initialize the response data obtained on the previous screen
         */
        removeResponse(this._$currentName);

        /**
         * 指定されたパス、もしくはURLからアクセス先を算出
         * Calculate the access point from the specified path or URL
         */
        const queryObject: QueryObjectImpl = queryParser(name);

        /**
         * 現在の画面名を更新
         * Update current screen name
         */
        this._$currentName = queryObject.name;

        /**
         * 遷移履歴をセット
         * Set transition history
         */
        if (config.spa && !this._$popstate) {
            history.pushState("", "",
                `${location.origin}/${this._$currentName}${queryObject.queryString}`
            );
        }

        // update
        this._$popstate = false;

        /**
         * routing.jsonで設定したリクエスト処理を実行
         * Execute request processing set by routing.json
         */
        const responses: ResponseDTO[] = await Promise.all(requestUseCase(this._$currentName));

        /**
         * レスポンス情報をマップに登録
         * Response information is registered on the map
         */
        for (let idx: number = 0; idx < responses.length; ++idx) {

            const object: ResponseDTO = responses[idx];
            if (!object.name) {
                continue;
            }

            response.set(object.name, object.response);
        }

        /**
         * ViewとViewModelを起動
         * Start View and ViewModel
         */
        const view: View = await context.boot(this._$currentName);

        /**
         * コールバック設定があれば実行
         * Execute callback settings if any.
         */
        if (view && config.gotoView) {
            const promises: Promise<any>[] = [];
            promises.push(callback(
                config.gotoView.callback, view
            ));

            await Promise.all(promises);
        }

        /**
         * ローディング表示を終了
         * End loading display
         */
        await loadingEnd();

        /**
         * 前の画面のキャプチャーを終了
         * End previous screen capture
         */
        captureDispose();
    }
}
