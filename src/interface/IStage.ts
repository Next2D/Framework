import type { IOptions } from "./IOptions";

export interface IStage {
    width: number;
    height: number;
    fps: number;
    options?: IOptions;
}