import { packages } from "../../application/variable/Packages";

/**
 * @description configで指定されたクラスのexecute関数を実行
 *              Execute function of the class specified in config.
 *
 * @param  {string|array} [callback=""]
 * @param  {*} [value=null]
 * @return {Promise}
 * @method
 * @public
 */
export const execute = (
    callback: string | string[] = "",
    value: any = null
): Promise<Awaited<any>[]|void> => {

    if (!callback) {
        return Promise.resolve();
    }

    const callbacks: string[] = typeof callback === "string"
        ? [callback]
        : callback;

    const promises: Promise<any>[] = [];
    for (let idx: number = 0; idx < callbacks.length; ++idx) {

        const name: string = callbacks[idx];
        if (!packages.has(name)) {
            continue;
        }

        const CallbackClass: any = packages.get(name);
        promises.push(new CallbackClass().execute(value));
    }

    return Promise.all(promises);
};