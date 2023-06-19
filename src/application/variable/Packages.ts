/**
 * @type {Map}
 * @public
 */
export let packages: Map<string, any> = new Map();

/**
 * @param  {array} package_list
 * @return {void}
 * @method
 * @private
 */
export const $setPackages = (package_list: any[]): void =>
{
    packages = new Map(package_list);
};