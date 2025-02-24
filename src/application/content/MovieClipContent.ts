import { MovieClip } from "@next2d/display";
import { execute as contentBuilderService } from "./Builder/service/ContentBuilderService";

/**
 * @description Animation Toolで作成したMovieClipの動的生成の補完を行うクラス。
 *              A class that complements the dynamic generation of MovieClip created by the Animation Tool.
 *
 * @class
 * @extends {MovieClip}
 */
export class MovieClipContent extends MovieClip
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        contentBuilderService(this);

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