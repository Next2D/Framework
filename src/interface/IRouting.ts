import type { IRequest } from "./IRequest";

export interface IRouting {
    private?: boolean;
    requests?: IRequest[];
    redirect?: string;
}