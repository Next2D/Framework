import { Video } from "@next2d/media";
import { execute as contentBuilder } from "./Builder/service/ContentBuilderService";

/**
 * @description Animation Toolで作成したVideoの動的生成の補完を行うクラス。
 *              A class that complements the dynamic generation of Video created by the Animation Tool.
 *
 * @class
 * @memberof application.content
 * @extends {Video}
 */
export class VideoContent extends Video
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        contentBuilder(this);

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