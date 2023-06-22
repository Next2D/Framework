import { loaderInfoMap } from "../variable/LoaderInfoMap";
import type { LoaderInfo } from "@next2d/player/dist/player/next2d/display/LoaderInfo";
import type { Character } from "@next2d/player/dist/interface/Character";
import type { DisplayObjectImpl } from "@next2d/player/dist/interface/DisplayObjectImpl";

/**
 * @description NoCode Toolで作成したアニメーションの動的生成の補完を行うクラス。
 *              A class that completes the dynamic generation of animations created by NoCode Tool.
 *
 * @class
 * @memberof application.content
 */
export class ContentBuilder
{
    /**
     * @param  {object} instance
     * @return {object}
     * @method
     * @static
     */
    static execute (instance: DisplayObjectImpl<any>): void
    {
        const name = instance.namespace;
        if (!loaderInfoMap.has(name)) {
            return ;
        }

        // Set the target LoaderInfo class
        const loaderInfo: LoaderInfo | void = loaderInfoMap.get(name);
        if (!loaderInfo || !loaderInfo._$data) {
            return ;
        }

        const characterId: number | void  = loaderInfo._$data.symbols.get(name);
        if (!characterId) {
            return ;
        }

        const character: Character<any> = loaderInfo._$data.characters[characterId];
        if (!character) {
            return ;
        }

        instance._$loaderInfo  = loaderInfo;
        instance._$characterId = characterId;
        instance._$sync(character);
    }
}
