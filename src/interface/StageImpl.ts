import { OptionsImpl } from "./OptionsImpl";

export interface StageImpl {
    width: number;
    height: number;
    fps: number;
    options?: OptionsImpl;
}