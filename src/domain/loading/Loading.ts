import type { LoadingImpl } from "src/interface/LoadingImpl";
import { config } from "../../application/variable/Config";
import { packages } from "../../application/variable/Packages";
import { DefaultLoading } from "../screen/DefaultLoading";

/**
 * @type {object}
 * @default null
 * @private
 */
let $instance: LoadingImpl | null = null;

/**
 * @description ページ遷移時のローディング演出を開始
 *              Starts loading performance at page transitions
 *
 * @return {Promise}
 * @method
 * @public
 */
export const start = (): Promise<void> =>
{
    return new Promise((resolve): void =>
    {
        if (!config || !config.loading) {
            return resolve();
        }

        const name: string | void = config.loading.callback;
        if (!name) {
            return resolve();
        }

        if (!$instance) {
            const CallbackClass: any = packages.has(name)
                ? packages.get(name)
                : DefaultLoading;

            $instance = new CallbackClass();
        }

        if (!$instance) {
            return resolve();
        }

        $instance.start();

        setTimeout(() =>
        {
            resolve();
        }, 500);
    });
};

/**
 * @description ページ遷移時のローディング演出を終了
 *              Terminate loading direction at page transition
 *
 * @return {Promise}
 * @method
 * @public
 */
export const end = (): Promise<void> =>
{
    return new Promise((resolve): void =>
    {
        if (!config || !config.loading) {
            return resolve();
        }

        const name: string | undefined = config.loading.callback;
        if (!name) {
            return resolve();
        }

        if (!$instance) {

            const CallbackClass: any = packages.has(name)
                ? packages.get(name)
                : DefaultLoading;

            $instance = new CallbackClass();
        }

        if (!$instance) {
            return resolve();
        }

        resolve($instance.end());
    });
};