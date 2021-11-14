import { ComponentInternalInstance } from 'vue';
import type { MetaManager } from './manager';
import type { MetaActive, MetaSource, MetaProxy } from './types';
export declare function getCurrentManager(vm?: ComponentInternalInstance): MetaManager | undefined;
export declare function useMeta(source: MetaSource, manager?: MetaManager): MetaProxy;
export declare function useActiveMeta(): MetaActive;
//# sourceMappingURL=useApi.d.ts.map