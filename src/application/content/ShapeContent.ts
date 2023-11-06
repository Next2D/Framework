import { Shape } from "@next2d/display";
import { execute as contentBuilder } from "./ContentBuilder";

/**
 * @description NoCode Toolで作成したShapeの動的生成の補完を行うクラス。
 *              A class that complements the dynamic generation of Shape created by the NoCode Tool.
 *
 * @class
 * @memberof application.content
 * @extends {Shape}
 */
export class ShapeContent extends Shape
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