import { Common } from "../model/common/Common";

/**
 * @class
 * @extends {Common}
 */
export class ViewModel extends Common
{
    /**
     * @constructor
     * @public
     */
    constructor()
    {
        super();
    }

    /**
     * @param  {View} view
     * @return {void}
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars,no-empty-function
    bind (view) {}

    /**
     * @param  {View} view
     * @return {void}
     * @abstract
     */
    // eslint-disable-next-line no-unused-vars,no-empty-function
    unbind (view) {}
}