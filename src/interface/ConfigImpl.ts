import { StageImpl } from "./StageImpl";
import { RoutingImpl } from "./RoutingImpl";
import { LoadingImpl } from "./LoadingImpl";
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
    spa: boolean;
    loading?: LoadingImpl;
    gotoView?: GotoViewImpl;
}