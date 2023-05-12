/**
 * configファイルに設定した変数パスのパーサークラス
 * Parser class for variable paths set in config file
 *
 * @class
 * @memberof domain.parser
 */
export class ConfigParser
{
    /**
     * @description 指定されたstringを分解して、configの変数パスの値を返す
     *              Disassembles the given string and returns the value of the config variable path
     *
     * @param  {string} [value=""]
     * @return {string}
     * @method
     * @public
     */
    execute (value: string = ""): string
    {
        if (value.indexOf("{{") === -1) {
            return value;
        }

        const values: RegExpMatchArray|null = value.match(/\{\{(.*?)\}\}/g);
        if (!values) {
            return value;
        }

        let returnValue: string = value;
        for (let idx: number = 0; idx < values.length; ++idx) {

            const value: string = values[idx];

            const names: string[] = value
                .replace(/\{|\{|\}|\}/g, "")
                .replace(/ /g, "")
                .split(".");

            // @ts-ignore
            let config: any = next2d.fw.config;
            for (let idx: number = 0; idx < names.length; ++idx) {
                const name: string = names[idx];
                if (name in config) {
                    config = config[name];
                }
            }

            // @ts-ignore
            if (config === next2d.fw.config) {
                continue;
            }

            returnValue = returnValue.replace(value, config);
        }

        return returnValue;
    }
}