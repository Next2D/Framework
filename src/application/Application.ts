import { Context } from "./Context";
import { ConfigParser } from "../domain/parser/ConfigParser";
import { QueryParser } from "../domain/parser/QueryParser";
import { RequestUseCase } from "../infrastructure/usecase/RequestUseCase";
import { Callback } from "../domain/callback/Callback";
import { Loading } from "../domain/loading/Loading";
import { Capture } from "../domain/screen/Capture";
import { RemoveResponse } from "./service/RemoveResponse";
import { ResponseDTO } from "../infrastructure/dto/ResponseDTO";
import { View } from "../view/View";

interface QueryObject {
    name: string;
    queryString: string;
}

/**
 * シーン遷移のコントロールを行うクラス。
 * Class for controlling scene transitions.
 *
 * @class
 * @memberof application
 */
export class Application
{
    private readonly _$queryParser: QueryParser;
    private readonly _$requestUseCase: RequestUseCase;
    private readonly _$callback: Callback;
    private readonly _$loading: Loading;
    private readonly _$capture: Capture;
    private readonly _$removeResponse: RemoveResponse;
    private _$popstate: boolean;
    private _$currentName: string;

    /**
     * @param {object} config
     * @param {array}  packages
     * @constructor
     * @public
     */
    constructor (config: any, packages: any)
    {
        /**
         * @type {object}
         * @static
         */
        // @ts-ignore
        next2d.fw.config = config;

        /**
         * @type {Map}
         * @static
         */
        // @ts-ignore
        next2d.fw.packages = new Map(packages);

        /**
         * @type {Application}
         * @static
         */
        // @ts-ignore
        next2d.fw.application = this;

        /**
         * @type {Context}
         * @static
         */
        // @ts-ignore
        next2d.fw.context = new Context(
            config.stage.width,
            config.stage.height,
            config.stage.fps,
            config.stage.options
        );

        /**
         * @type {ConfigParser}
         * @static
         */
        // @ts-ignore
        next2d.fw.parser = new ConfigParser();

        /**
         * @type {QueryParser}
         * @private
         */
        this._$queryParser = new QueryParser();

        /**
         * @type {RequestUseCase}
         * @private
         */
        this._$requestUseCase = new RequestUseCase();

        /**
         * @type {Callback}
         * @private
         */
        this._$callback = new Callback();

        /**
         * @type {Loading}
         * @private
         */
        this._$loading = new Loading();

        /**
         * @type {Capture}
         * @private
         */
        this._$capture = new Capture();

        /**
         * @type {RemoveResponse}
         * @private
         */
        this._$removeResponse = new RemoveResponse();

        /**
         * @type {boolean}
         * @default false
         * @private
         */
        this._$popstate = false;

        /**
         * SPAが有効の場合は、遷移の履歴を残す
         * Keep history of transitions if SPA setting is enabled
         */
        if (config.spa) {
            window.addEventListener("popstate", () =>
            {
                this._$popstate = true;
                this.gotoView();
            });
        }

        /**
         * @type {string}
         * @default "top"
         * @private
         */
        this._$currentName = "top";

        // initial processing
        this.initialize();
    }

    /**
     * @description constructorが起動した後にコールされます。(初回起動時のみコールされます。)
     *              Called after the constructor is invoked. (Called only the first time it is invoked.)
     *
     * @return {void}
     * @method
     * @abstract
     */
    // eslint-disable-next-line no-empty-function
    initialize (): void {}

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
    gotoView (name: string = ""): Promise<void>
    {
        // @ts-ignore
        const config: any = next2d.fw.config;

        const promises: Promise<void>[] = [];
        if (config.loading) {
            /**
             * ローディング表示を起動
             * Launch loading display
             */
            this._$loading.start();

            /**
             * 現時点の描画をBitmapにして処理の負担を減らす
             * Reduce the processing burden by making the current drawing a Bitmap.
             */
            promises.push(this._$capture.execute());
        }

        return Promise
            .all(promises)
            .then((): Promise<void> =>
            {
                /**
                 * 前の画面で取得したレスポンスデータを初期化
                 * Initialize the response data obtained on the previous screen
                 */
                this
                    ._$removeResponse
                    .execute(this._$currentName);

                return Promise.resolve();
            })
            .then((): Promise<void> =>
            {
                /**
                 * 指定されたパス、もしくはURLからアクセス先を算出
                 * Calculate the access point from the specified path or URL
                 */
                const object: QueryObject = this._$queryParser.execute(name);

                this._$currentName = object.name;

                /**
                 * 遷移履歴をセット
                 * Set transition history
                 */
                if (config.spa && !this._$popstate) {
                    history.pushState("", "",
                        `${location.origin}/${this._$currentName}${object.queryString}`
                    );
                }

                // update
                this._$popstate = false;

                return Promise.resolve();
            })
            .then((): Promise<Awaited<ResponseDTO>[]> =>
            {
                /**
                 * routing.jsonで設定したリクエスト処理を実行
                 * Execute request processing set by routing.json
                 */
                return Promise
                    .all(this._$requestUseCase.execute(this._$currentName));
            })
            .then((responses): Promise<void> =>
            {
                /**
                 * レスポンス情報をマップに登録
                 * Response information is registered on the map
                 */
                // @ts-ignore
                const response: Map<string, any> = next2d.fw.response;
                for (let idx: number = 0; idx < responses.length; ++idx) {

                    const object: ResponseDTO = responses[idx];
                    if (!object.name) {
                        continue;
                    }

                    response.set(object.name, object.response);
                }

                return Promise.resolve();
            })
            .then((): Promise<View> =>
            {
                /**
                 * ViewとViewModelを起動
                 * Start View and ViewModel
                 */
                return Promise.resolve(
                    // @ts-ignore
                    next2d.fw.context.addChild(this._$currentName)
                );
            })
            .then((view: View): Promise<Awaited<any>[]> =>
            {
                // @ts-ignore
                const config: any = next2d.fw.config;

                /**
                 * コールバック設定があれば実行
                 * Execute callback settings if any.
                 */
                const promises: Promise<any>[] = [];
                if ("gotoView" in config) {
                    promises.push(this._$callback.execute(
                        config.gotoView.callback, view
                    ));
                }

                return Promise.all(promises);
            })
            .then(() =>
            {
                /**
                 * ローディング表示を終了
                 * End loading display
                 */
                this._$loading.end();
            });
    }
}
