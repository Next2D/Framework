import { RequestTypeImpl } from "./RequestTypeImpl";

export interface RequestImpl {
    type: RequestTypeImpl;
    path?: string;
    name?: string;
    cache?: boolean;
    callback?: string | string[any];
    class?: string;
    access?: string;
    method?: string;
    headers?: HeadersInit;
    body?: object;
}