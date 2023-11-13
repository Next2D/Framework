import { StageImpl } from "./StageImpl";
import { RoutingImpl } from "./RoutingImpl";
import { GotoViewImpl } from "./GotoViewImpl";

interface BaseConfigImpl {
    [key: string]: any
}

export interface ConfigImpl extends BaseConfigImpl {
    platform: string;
    stage: StageImpl;
    routing?: {
        [key: string]: RoutingImpl
    };
    defaultTop?: string;
    spa: boolean;
    loading?: {
        callback: string;
    };
    gotoView?: GotoViewImpl;
}