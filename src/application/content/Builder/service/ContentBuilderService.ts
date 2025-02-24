import type { IContent } from "../../../../interface/IContent";
import { loaderInfoMap } from "../../../variable/LoaderInfoMap";

/**
 * @description Animation Toolで作成したアニメーションを動的に生成
 *              Dynamically generate animations created with Animation Tool
 *
 * @param  {IContent} display_object
 * @return {void}
 * @method
 * @protected
 */
export const execute = (display_object: IContent): void =>
{
    // Set the target LoaderInfo class
    const name = display_object.namespace;
    const loaderInfo = loaderInfoMap.get(name);
    if (!loaderInfo || !loaderInfo.data) {
        return ;
    }

    const characterId: number | void = loaderInfo.data.symbols.get(name);
    if (!characterId) {
        return ;
    }

    const character = loaderInfo.data.characters[characterId];
    if (!character) {
        return ;
    }

    display_object.characterId = characterId;
    display_object.$sync(character, loaderInfo);
};