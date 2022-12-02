import { MovieClip } from "@/model/common/MovieClip";

/**
 * Viewの親クラス、抽象クラスとして存在しています。
 * It exists as a parent class of View and as an abstract class.
 *
 * @class
 * @extends {MovieClip}
 */
export class View extends MovieClip
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();
        this.initialize();
    }

    /**
     * @description constructorが起動した後にコールされます。
     *              Called after the constructor is invoked.
     *
     * @return {void}
     * @abstract
     */
    // eslint-disable-next-line no-empty-function
    initialize () {}
}
