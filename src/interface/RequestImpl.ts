export interface RequestImpl {
    type: string;
    path?: string;
    name?: string;
    cache?: boolean;
    callback?: string | string[any];
    class?: string;
    access?: string;
    method?: string;
}