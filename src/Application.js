import { Model } from "./model/common/Model";
import { Context } from "./Context";
import { Cache } from "./cache/Cache";
import { Variable } from "./model/common/Variable";
import { Query } from "./model/common/Query";
import { Config } from "./Config";

/**
 * @class
 * @memberOf next2d.fw
 * @extends  {Model}
 */
export class Application extends Model
{
    /**
     * @param {object} config
     * @param {array} packages
     * @constructor
     * @public
     */
    constructor (config, packages)
    {
        super ();

        /**
         * @type {object}
         * @static
         */
        next2d.fw.config = config;

        /**
         * @type {Map}
         * @static
         */
        next2d.fw.packages = new Map(packages);

        /**
         * @type {Application}
         * @static
         */
        next2d.fw.application = this;

        /**
         * @type {Context}
         * @static
         */
        next2d.fw.context = new Context(
            this.config.stage.width,
            this.config.stage.height,
            this.config.stage.fps,
            this.config.stage.options
        );

        /**
         * @type {Cache}
         * @static
         */
        next2d.fw.cache = new Cache();

        /**
         * @type {Variable}
         * @static
         */
        next2d.fw.variable = new Variable();

        /**
         * @type {Query}
         * @static
         */
        next2d.fw.query = new Query();

        if (this.config.spa) {
            window.addEventListener("popstate", () =>
            {
                this._$popstate = true;
                this.gotoView();
            });
        }

        /**
         * @type {boolean}
         * @default false
         * @private
         */
        this._$popstate = false;

        // initial processing
        this.initialize();
    }

    /**
     * @return {void}
     * @abstract
     */
    // eslint-disable-next-line no-empty-function
    initialize () {}

    /**
     * @param  {string} [name=null]
     * @return {void}
     * @method
     * @public
     */
    gotoView (name = null)
    {
        const root = this.context.root;
        if (this.config.loading && root.numChildren) {
            this._$createSnapshot();
            this._$startLoading();
        }

        if (this.query.length) {
            this.query.clear();
        }

        if (!name) {
            name = location.pathname.slice(1) || "top";
        }

        let query = "";

        if (location.search) {
            query = location.search;
            const parameters = query.slice(1).split("&");
            for (let idx = 0; idx < parameters.length; ++idx) {
                const pair = parameters[idx].split("=");
                this.query.set(pair[0], pair[1]);
            }
        }

        if (name.indexOf("?") > -1) {

            const names = name.split("?");

            name  = names[0];
            query = `?${names[1]}`;

            const parameters = names[1].split("&");
            for (let idx = 0; idx < parameters.length; ++idx) {
                const pair = parameters[idx].split("=");
                this.query.set(pair[0], pair[1]);
            }
        }

        if (this.config.spa && !this._$popstate) {
            const url = name === "top"
                ? `${location.origin}${location.search}`
                : `${location.origin}/${name}${query}`;

            history.pushState("", "", url);
        }

        // update
        this._$popstate = false;

        Promise
            .all(this._$requests(name))
            .then((responses) => { return this.context.addChild(name, responses) })
            .then((view) => { this._$callback(this.config.gotoView.callback, view) });

    }

    /**
     * @return {void}
     * @private
     */
    _$createSnapshot ()
    {
        const root = this.context.root;

        const ratio = window.devicePixelRatio;

        const { Sprite, Shape, BitmapData } = next2d.display;
        const { Matrix } = next2d.geom;

        const bitmapData = new BitmapData(
            root.stage.stageWidth  * ratio,
            root.stage.stageHeight * ratio,
            true, 0
        );

        bitmapData.draw(root, new Matrix(ratio, 0, 0, ratio, 0, 0));

        // remove all
        while (root.numChildren) {
            root.removeChild(root.getChildAt(0));
        }

        const sprite  = root.addChild(new Sprite());
        sprite.scaleX = 1 / ratio;
        sprite.scaleY = 1 / ratio;

        const snapshot = sprite.addChild(new Shape());
        snapshot
            .graphics
            .beginBitmapFill(bitmapData)
            .drawRect(0, 0, bitmapData.width, bitmapData.height)
            .endFill();

        const width  = this.config.stage.width;
        const height = this.config.stage.height;

        const mask = root.addChild(new Shape());
        mask
            .graphics
            .beginFill(0, 0.8)
            .drawRect(0, 0, width, height)
            .endFill();

        const player = root.stage._$player;
        const matrix = player._$matrix;

        const tx = matrix[4];
        if (tx) {
            const scaleX = matrix[0];
            mask.scaleX = (width + tx * 2 / scaleX) / width;
            mask.x = -tx / scaleX;
        }

        const ty = matrix[5];
        if (ty) {
            const scaleY = matrix[3];
            mask.scaleY = (height + ty * 2 / scaleY) / height;
            mask.y = -ty / scaleY;
        }
    }

    /**
     * @return {void}
     * @private
     */
    _$startLoading ()
    {
        const root   = this.context.root;
        const player = root.stage._$player;

        const elementId = `${Config.$PREFIX}_loading`;

        const element = document.getElementById(elementId);
        if (!element) {

            const parent = document.getElementById(player.contentElementId);

            const loader = document.createElement("div");

            loader.id = elementId;

            loader.innerHTML = `<div></div><div></div><div></div><style>
@keyframes __next2d__framework_loading {
  0% {
    transform: scale(1);
    opacity: 1; 
  }
  45% {
    transform: scale(0.1);
    opacity: 0.7; 
  }
  80% {
    transform: scale(1);
    opacity: 1; 
  } 
}
    
#__next2d__framework_loading > div:nth-child(1) {
  animation: __next2d__framework_loading 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#__next2d__framework_loading > div:nth-child(2) {
  animation: __next2d__framework_loading 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#__next2d__framework_loading > div:nth-child(3) {
  animation: __next2d__framework_loading 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#__next2d__framework_loading {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -24px 0 0 -24px;
  width: 57px;
  height: 19px;
  z-index: 9999;
  opacity: 0.5;
  pointer-events: none;
}

#__next2d__framework_loading > div {
  background-color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block; 
}
</style>`;

            parent.insertBefore(loader, parent.children[0]);

        } else {

            element.style.display = "";

        }

    }

    /**
     * @param  {string} name
     * @return {array}
     * @method
     * @private
     */
    _$requests (name)
    {
        const routing = this.config.routing[name];
        if (!routing || !routing.requests || !routing.requests.length) {
            return [];
        }

        const promises = [];
        for (let idx = 0; idx < routing.requests.length; ++idx) {

            const object = routing.requests[idx];

            if (object.cache && object.name && this.cache.has(object.name)) {

                const cache = this.cache.get(object.name);

                this._$callback(object.callback, cache);

                promises.push({
                    "name": object.name,
                    "response": cache
                });
                continue;
            }

            promises.push(object.type === "json"
                ? this._$loadJSON(object)
                : this._$loadContent(object)
            );
        }

        return promises;
    }

    /**
     * @param  {object} object
     * @return {Promise}
     * @method
     * @private
     */
    _$loadJSON (object)
    {
        const method = object.method ? object.method.toUpperCase() : "GET";
        const body   = object.body && (method === "POST" || method === "PUT")
            ? object.body
            : null;

        return fetch(`${this._$parseURL(object.path)}`, {
            "method": method,
            "headers": object.headers ? object.headers : {},
            "body": body
        })
            .then((response) => { return response.json() })
            .then((data) =>
            {
                this._$callback(object.callback, data);

                if (object.cache && object.name) {
                    next2d.fw.cache.set(object.name, data);
                }

                return {
                    "name": object.name,
                    "response": data
                };
            });
    }

    /**
     * @param  {object} object
     * @return {Promise}
     * @method
     * @private
     */
    _$loadContent (object)
    {
        return new Promise((resolve, reject) =>
        {
            const { URLRequest, URLRequestHeader, URLRequestMethod } = next2d.net;
            const { Loader } = next2d.display;
            const { Event, IOErrorEvent } = next2d.events;

            const request  = new URLRequest(`${this._$parseURL(object.path)}`);
            request.method = object.method
                ? object.method.toUpperCase()
                : URLRequestMethod.GET;

            if (object.headers) {
                for (const [name, value] of Object.entries(object.headers)) {
                    request.requestHeaders.push(new URLRequestHeader(name, value));
                }
            }

            if (object.body) {
                request.data = JSON.stringify(object.body);
            }

            const loader = new Loader();
            loader
                .contentLoaderInfo
                .addEventListener(Event.COMPLETE, (event) =>
                {
                    const content    = event.currentTarget.content;
                    const loaderInfo = content._$loaderInfo;

                    // DisplayObjectContainer
                    if (loaderInfo._$data) {
                        const symbols = loaderInfo._$data.symbols;
                        if (symbols.size) {
                            for (const name of symbols.keys()) {
                                next2d.fw.loaderInfo.set(
                                    name.split(".").pop(), loaderInfo
                                );
                            }
                        }
                    }

                    this._$callback(object.callback, content);

                    if (object.cache && object.name) {
                        next2d.fw.cache.set(object.name, content);
                    }

                    resolve({
                        "name": object.name,
                        "response": content
                    });
                });

            loader
                .contentLoaderInfo
                .addEventListener(IOErrorEvent.IO_ERROR, reject);

            if (object.type === "image") {

                loader.loadImage(request);

            } else {

                loader.load(request);

            }
        });
    }

    /**
     * @param  {string|array} [callback=null]
     * @param  {*} [value=null]
     * @return {void}
     * @private
     */
    _$callback (callback = null, value = null)
    {
        if (!callback) {
            return ;
        }

        const callbacks = typeof callback === "string"
            ? [callback]
            : callback;

        for (let idx = 0; idx < callbacks.length; ++idx) {

            const name = callbacks[idx];
            if (!this.packages.has(name)) {
                continue;
            }

            const CallbackClass = this.packages.get(name);
            new CallbackClass(value).execute();
        }
    }

    /**
     * @param  {string} path
     * @return {string}
     * @private
     */
    _$parseURL (path)
    {
        let url = path;

        const values = path.match(/\{\{(.*?)\}\}/g);
        if (values) {

            for (let idx = 0; idx < values.length; ++idx) {

                const value = values[idx];

                const name = value
                    .replace(/\{|\{|\}|\}/g, "");

                if (name in this.config) {
                    url = url.replace(value, this.config[name]);
                }
            }

        }

        return url;
    }
}