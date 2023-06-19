import { RequestImpl } from "./RequestImpl";

export interface RoutingImpl {
    private?: boolean;
    requests?: RequestImpl[];
}