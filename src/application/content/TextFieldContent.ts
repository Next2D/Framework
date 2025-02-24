import { TextField } from "@next2d/text";
import { execute as contentBuilderService } from "./Builder/service/ContentBuilderService";

/**
 * @description Animation Toolで作成したTextFieldの動的生成の補完を行うクラス。
 *              A class that complements the dynamic generation of TextField created by the Animation Tool.
 *
 * @class
 * @extends {TextField}
 */
export class TextFieldContent extends TextField
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