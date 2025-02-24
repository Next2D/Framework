import { DefaultLoader } from "../../DefaultLoader";
import { $getConfig } from "../../../../application/variable/Config";
import { packages } from "../../../../application/variable/Packages";
import {
    $getInstance,
    $setInstance
} from "../../Loading";

/**
 * @description ローダーのアニメーションを実行
 *              Execute loader animation
 *
 * @return {Promise<void>}
 * @method
 * @protected
 */
export const execute = async (): Promise<void> =>
{
    const config = $getConfig();
    if (!config || !config.loading) {
        return ;
    }

    const name: string | void = config.loading.callback;
    if (!name) {
        return ;
    }

    let instance = $getInstance();
    if (!instance) {

        const LoaderClass: any = packages.has(name)
            ? packages.get(name)
            : DefaultLoader;

        instance = new LoaderClass();
        $setInstance(instance);
    }

    await instance.start();
};