import { ConfigParser } from "../parser/ConfigParser";

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
        // @ts-ignore
        const config: any = next2d.fw.config;
        if (!config.loading) {
            return ;
        }

        const callback: string|void = config.loading.callback;
        if (!callback) {
            return ;
        }

        // @ts-ignore
        const packages: Map<string, any> = next2d.fw.packages;

        // @ts-ignore
        const parser: ConfigParser = next2d.fw.parser;

        const name: string = parser.execute(callback);

        const CallbackClass: any = packages.has(name)
            ? packages.get(name)
            // @ts-ignore
            : next2d.fw.DefaultLoading;

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
        // @ts-ignore
        const config: any = next2d.fw.config;
        if (!config.loading) {
            return ;
        }

        const callback: string|undefined = config.loading.callback;
        if (!callback) {
            return ;
        }

        // @ts-ignore
        const packages: Map<string, any> = next2d.fw.packages;

        // @ts-ignore
        const parser: ConfigParser = next2d.fw.parser;

        const name: string = parser.execute(callback);

        const CallbackClass: any = packages.has(name)
            ? packages.get(name)
            // @ts-ignore
            : next2d.fw.DefaultLoading;

        new CallbackClass().end();
    }
}