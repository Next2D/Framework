/**
 * @type {Map}
 * @protected
 */
export let packages: Map<string, Function> = new Map();

/**
 * @param  {Array<Array<string | Function>>} package_list
 * @return {void}
 * @method
 * @protected
 */
export const $setPackages = (package_list: any): void =>
{
    packages = new Map(package_list);
};