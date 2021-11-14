import type { MergeContext, MergeSource, PathSegments, ResolveContext } from '.';
export declare const createProxy: <T extends Record<string, any>>(context: MergeContext<T>, target: T, resolveContext: ResolveContext, pathSegments?: PathSegments) => MergeSource<T>;
export declare const createHandler: <T>(context: MergeContext<T>, resolveContext: ResolveContext, pathSegments?: PathSegments) => ProxyHandler<MergeSource<T>>;
//# sourceMappingURL=proxy.d.ts.map