import { packages } from "../../../application/variable/Packages";

/**
 * @description configで指定されたクラスのexecute関数を実行
 *              Execute function of the class specified in config.
 *
 * @param  {string | string[]} [callback=""]
 * @param  {*} [value=null]
 * @return {Promise}
 * @method
 * @public
 */
export const execute = async (
    callback: string | string[] = "",
    value: any = null
): Promise<Awaited<any>[]|void> => {

    if (!callback) {
        return ;
    }

    const callbacks: string[] = typeof callback === "string"
        ? [callback]
        : callback;

    for (let idx = 0; idx < callbacks.length; ++idx) {

        const name = callbacks[idx];
        if (!packages.has(name)) {
            continue;
        }

        const CallbackClass: any = packages.get(name);
        await new CallbackClass().execute(value);
    }
};