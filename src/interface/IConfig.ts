import type { IStage } from "./IStage";
import type { IRouting } from "./IRouting";
import type { IGotoView } from "./IGotoView";

interface IBaseConfig {
    [key: string]: any
}

export interface IConfig extends IBaseConfig {
    platform: string;
    stage: IStage;
    spa: boolean;
    defaultTop?: string;
    gotoView?: IGotoView;
    routing?: {
        [key: string]: IRouting
    };
    loading?: {
        callback: string;
    };
}