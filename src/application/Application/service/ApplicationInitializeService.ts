import type { IConfig } from "../../../interface/IConfig";
import type { IPackages } from "../../../interface/IPackages";
import type { Application } from "../../Application";
import { $setConfig } from "../../variable/Config";
import { $setPackages } from "../../variable/Packages";

/**
 * @type {Promise}
 * @private
 */
let $popstateQueue: Promise<void> = Promise.resolve();

/**
 * @description アプリケーションの初期化処理を実行します
 *              Execute the application initialization process
 *
 * @param  {Application} application
 * @param  {IConfig} config
 * @param  {IPackages} packages
 * @return {Application}
 * @method
 * @protected
 */
export const execute = (
    application: Application,
    config: IConfig,
    packages: IPackages
): Application => {

    $setConfig(config);
    $setPackages(packages);

    /**
     * SPAが有効の場合は、遷移の履歴を残す
     * Keep history of transitions if SPA setting is enabled
     */
    if (config.spa) {
        window.addEventListener("popstate", async (): Promise<void> =>
        {
            application.popstate = true;
            $popstateQueue = $popstateQueue.then(() => application.gotoView());
        });
    }

    return application;
};