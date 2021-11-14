import type { MergeContext, MergeSource, MergedObject, PathSegments } from '.';
export declare const allKeys: <T>(source?: MergeSource<T> | undefined, ...sources: MergeSource<T>[]) => string[];
export declare const recompute: <T>(context: MergeContext<T>, path?: PathSegments, target?: MergedObject | undefined, sources?: MergeSource<T>[] | undefined) => void;
//# sourceMappingURL=recompute.d.ts.map