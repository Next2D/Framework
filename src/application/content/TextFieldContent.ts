import { TextField } from "@next2d/player/dist/player/next2d/text/TextField";
import { ContentBuilder } from "./ContentBuilder";

/**
 * @description NoCode Toolで作成したTextFieldの動的生成の補完を行うクラス。
 *              A class that complements the dynamic generation of TextField created by the NoCode Tool.
 *
 * @class
 * @memberof application.content
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

        ContentBuilder.execute(this);

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