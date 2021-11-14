import { App, ComponentInternalInstance, Slots } from 'vue';
import type { VNode } from 'vue';
import { MergedObjectBuilder } from './object-merge';
import type { ResolveMethod } from './object-merge';
import type { MetaConfig, MetaResolver, MetaTeleports, MetaSource, MetaProxy } from './types';
export declare const ssrAttribute = "data-vm-ssr";
export declare function addVnode(isSSR: boolean, teleports: MetaTeleports, to: string, vnodes: VNode | Array<VNode>): void;
export declare type CreateMetaManagerMethod = (isSSR: boolean, config: MetaConfig, resolver: MetaResolver | ResolveMethod) => MetaManager;
export declare const createMetaManager: (isSSR?: boolean, config?: MetaConfig | undefined, resolver?: MetaResolver | undefined) => MetaManager;
export declare class MetaManager {
    isSSR: boolean;
    config: MetaConfig;
    target: MergedObjectBuilder<MetaSource>;
    resolver?: MetaResolver;
    ssrCleanedUp: boolean;
    constructor(isSSR: boolean, config: MetaConfig, target: MergedObjectBuilder<MetaSource>, resolver: MetaResolver | ResolveMethod);
    static create: CreateMetaManagerMethod;
    install(app: App): void;
    addMeta(metadata: MetaSource, vm?: ComponentInternalInstance): MetaProxy;
    private unmount;
    private reallyUnmount;
    render({ slots }?: {
        slots?: Slots;
    }): VNode[];
}
//# sourceMappingURL=manager.d.ts.map