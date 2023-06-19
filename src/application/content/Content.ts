import { MovieClip } from "@next2d/player/dist/player/next2d/display/MovieClip";
import { loaderInfoMap } from "../variable/LoaderInfoMap";
import type { LoaderInfo } from "@next2d/player/dist/player/next2d/display/LoaderInfo";

/**
 * @description NoCode Toolで作成したアニメーションの動的生成の補完を行うクラス。
 *              A class that completes the dynamic generation of animations created by NoCode Tool.
 *
 * @class
 * @memberof application.content
 * @extends {MovieClip}
 */
export class Content extends MovieClip
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        if (loaderInfoMap.has(this.namespace)) {

            // Set the target LoaderInfo class
            this._$loaderInfo = loaderInfoMap.get(this.namespace) as NonNullable<LoaderInfo>;

            // Symbol linkage with NoCode Tool
            this._$sync();

            // Generate the initial children of the container
            this._$getChildren();

        }

        // initial processing
        this.initialize();
    }

    /**
     * @description constructorが起動した後にコールされます。
     *              Called after the constructor is invoked.
     *
     * @return {void}
     * @method
     * @abstract
     */
    // eslint-disable-next-line no-empty-function
    initialize (): void {}
}
