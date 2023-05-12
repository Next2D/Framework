/**
 * @description NoCode Toolで作成したアニメーションの動的生成の補完を行うクラス。
 *              A class that completes the dynamic generation of animations created by NoCode Tool.
 *
 * @class
 * @memberof application.content
 * @extends {window.next2d.display.MovieClip}
 */
// @ts-ignore
export class Content extends window.next2d.display.MovieClip
{
    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        super();

        // @ts-ignore
        const loaderInfoMap: Map<string, any> = next2d.fw.loaderInfo;

        // @ts-ignore
        if (loaderInfoMap.has(this.namespace)) {

            // Set the target LoaderInfo class
            // @ts-ignore
            this._$loaderInfo = loaderInfoMap.get(this.namespace);

            // Symbol linkage with NoCode Tool
            // @ts-ignore
            this._$sync();

            // Generate the initial children of the container
            // @ts-ignore
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
