import type { ResolveContext, ResolveMethod } from '../object-merge';
export interface ResolveOptionPredicament<T, U> {
    (currentValue: T | undefined, context: U): T;
}
export declare const resolveOption: <T, U = ResolveContext>(predicament: ResolveOptionPredicament<T, U>, initialValue?: T | undefined) => ResolveMethod<any, U>;
//# sourceMappingURL=index.d.ts.map