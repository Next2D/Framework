import { $currentPlayer } from "@next2d/util";
import type { Player } from "@next2d/core";

/**
 * @class
 * @memberof domain.screen
 */
export class DefaultLoading
{
    private readonly _$elementId: string;

    /**
     * @constructor
     * @public
     */
    constructor ()
    {
        /**
         * @type {string}
         * @private
         */
        this._$elementId = "__next2d__framework_loading";
    }

    /**
     * @description Canvasが設置されたDOMにローディング演出を登録、既にDOMがあれば演出を表示
     *              Register loading direction in the DOM where Canvas is installed,
     *              and display the direction if the DOM already exists.
     *
     * @return {void}
     * @method
     * @public
     */
    start (): void
    {
        const element: HTMLElement | null = document.getElementById(this._$elementId);
        if (!element) {

            const player: Player = $currentPlayer();

            const parent: HTMLElement | null = document
                .getElementById(player.contentElementId);

            if (!parent) {
                return ;
            }

            const loader: HTMLDivElement = document.createElement("div");

            loader.id = this._$elementId;

            loader.innerHTML = `<div></div><div></div><div></div>
<style>
@keyframes ${this._$elementId} {
  0% {
    transform: scale(1);
    opacity: 1; 
  }
  45% {
    transform: scale(0.1);
    opacity: 0.7; 
  }
  80% {
    transform: scale(1);
    opacity: 1; 
  } 
}
    
#${this._$elementId} > div:nth-child(1) {
  animation: ${this._$elementId} 0.75s -0.24s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#${this._$elementId} > div:nth-child(2) {
  animation: ${this._$elementId} 0.75s -0.12s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#${this._$elementId} > div:nth-child(3) {
  animation: ${this._$elementId} 0.75s 0s infinite cubic-bezier(0.2, 0.68, 0.18, 1.08); 
}

#${this._$elementId} {
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -10px 0 0 -30px;
  width: 60px;
  height: 20px;
  z-index: 9999;
  opacity: 0.5;
  pointer-events: none;
}

#${this._$elementId} > div {
  background-color: #fff;
  width: 15px;
  height: 15px;
  border-radius: 100%;
  margin: 2px;
  animation-fill-mode: both;
  display: inline-block; 
}
</style>`;

            parent.insertBefore(loader, parent.children[0]);

        } else {

            element.setAttribute("style", "");

        }

    }

    /**
     * @description ローディング演出を非表示にする
     *              Hide loading direction
     *
     * @return {void}
     * @method
     * @public
     */
    end (): void
    {
        const element: HTMLElement | null = document
            .getElementById(this._$elementId);

        if (element) {
            element.setAttribute("style", "display:none;");
        }
    }
}
