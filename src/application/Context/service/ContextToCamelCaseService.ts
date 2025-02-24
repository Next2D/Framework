/**
 * @description キャメルケースに変換
 *              Convert to CamelCase
 *
 * @param  {string} name
 * @return {string}
 * @method
 * @public
 */
export const execute = (name: string): string =>
{
    const names: string[] = name.split("/");

    let viewName: string = "";
    for (let idx: number = 0; names.length > idx; ++idx) {
        name = names[idx];
        viewName += name
            .charAt(0)
            .toUpperCase() + name.slice(1);
    }

    return viewName;
};