import { IS_PROXY, PROXY_SOURCES, PROXY_TARGET, RESOLVE_CONTEXT } from './constants';
export interface ResolveContext {
}
export declare type MergeSource<T extends Object> = {
    [K in keyof T]: T[K];
} & {
    [IS_PROXY]: boolean;
    [PROXY_SOURCES]: MergeSource<T>[];
    [PROXY_TARGET]: MergeSource<T>;
    [RESOLVE_CONTEXT]: ResolveContext;
};
export declare type MergedObjectValue = boolean | number | string | MergedObject | any;
export declare type MergedObject = {
    [key: string]: MergedObjectValue;
};
export declare type PathSegments = Array<string>;
export interface ResolveMethod<T = any, U = ResolveContext> {
    (options: Array<T>, contexts: Array<U>, active: MergedObjectValue, key: string | number | symbol, pathSegments: PathSegments): MergedObjectValue;
}
export declare type MergeContext<T> = {
    resolve: ResolveMethod;
    active: MergedObject;
    sources: MergeSource<T>[];
};
export declare type MergedObjectBuilder<T> = {
    context: MergeContext<T>;
    compute: () => void;
    addSource: (source: T, resolveContext?: ResolveContext, recompute?: Boolean) => any;
    delSource: (sourceOrProxy: T | MergeSource<T>, recompute?: boolean) => boolean;
};
export declare const createMergedObject: <T extends Object>(resolve: ResolveMethod<T, ResolveContext>, active: T) => MergedObjectBuilder<T>;
//# sourceMappingURL=index.d.ts.map