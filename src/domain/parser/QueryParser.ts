interface Object {
    name: string;
    queryString: string;
}

/**
 * @class
 */
export class QueryParser
{
    /**
     * @param  {string} [name=""]
     * @return {object}
     * @method
     * @public
     */
    execute (name: string = ""): Object
    {
        // @ts-ignore
        const config: any = next2d.fw.config;

        // @ts-ignore
        const query: Map<string, any> = next2d.fw.query;

        if (query.size) {
            query.clear();
        }

        /**
         * QueryStringがあれば分解
         * Disassemble QueryString if available
         */
        let queryString: string = "";
        if (!name && location.search) {
            queryString = location.search;
            const parameters = queryString.slice(1).split("&");
            for (let idx = 0; idx < parameters.length; ++idx) {
                const pair: string[] = parameters[idx].split("=");
                query.set(pair[0], pair[1]);
            }
        }

        if (!name) {
            const names: string[] = location.pathname.split("/");
            names.shift();
            name = `${names.join("/")}`;
            if (name) {
                const routing: any = config.routing[name];
                if (!routing) {
                    name = "top";
                }

                if (routing && routing.private) {
                    name = routing.redirect || "top";
                }
            }

            if (!name) {
                name = "top";
            }
        }

        /**
         * 任意で設定したQueryStringを分解
         * Decompose an arbitrarily set QueryString
         */
        if (name.indexOf("?") > -1) {

            const names: string[] = name.split("?");

            name  = names[0];
            queryString = `?${names[1]}`;

            const parameters: string[] = names[1].split("&");
            for (let idx = 0; idx < parameters.length; ++idx) {
                const pair: string[] = parameters[idx].split("=");
                query.set(pair[0], pair[1]);
            }
        }

        if (name.slice(0, 1) === ".") {
            name = name.split("/").slice(1).join("/") || "top";
        }

        if (name.indexOf("@") > -1) {
            name = name.replace("@", "");
        }

        return {
            "name": name,
            "queryString": queryString
        };
    }
}