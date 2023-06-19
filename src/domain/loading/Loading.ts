import { config } from "../../application/variable/Config";
import { packages } from "../../application/variable/Packages";
import { parser } from "../../application/variable/Parser";
import { DefaultLoading } from "../screen/DefaultLoading";

/**
 * @class
 * @memberof domain.loading
 */
export class Loading
{
    /**
     * @description デフォルトのローディング演出を開始
     *              Starts default loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    start (): void
    {
        if (!config || !config.loading) {
            return ;
        }

        const callback: string | void = config.loading.callback;
        if (!callback) {
            return ;
        }

        const name: string = parser.execute(callback);

        const CallbackClass: any = packages.has(name)
            ? packages.get(name)
            : DefaultLoading;

        new CallbackClass().start();
    }

    /**
     * @description デフォルトのローディング演出を終了
     *              End default loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    end (): void
    {
        if (!config || !config.loading) {
            return ;
        }

        const callback: string|undefined = config.loading.callback;
        if (!callback) {
            return ;
        }

        const name: string = parser.execute(callback);

        const CallbackClass: any = packages.has(name)
            ? packages.get(name)
            : DefaultLoading;

        new CallbackClass().end();
    }
}