import type { MetaConfigSectionAttribute, MetaConfigSectionGroup, MetaConfigSectionTag, MetaConfigSection, MetaGroupConfig, MetaRenderContext, MetaRenderedNode, MetaRendered, TODO } from './types';
export declare function renderMeta(context: MetaRenderContext, key: string, data: TODO, config: MetaConfigSection): void | MetaRendered | MetaRenderedNode;
export declare function renderGroup(context: MetaRenderContext, key: string, data: TODO, config: MetaConfigSectionGroup): MetaRendered | MetaRenderedNode;
export declare function renderTag(context: MetaRenderContext, key: string, data: TODO, config?: MetaConfigSectionTag, groupConfig?: MetaGroupConfig): MetaRendered | MetaRenderedNode | void;
export declare function renderAttributes(context: MetaRenderContext, key: string, data: TODO, config: MetaConfigSectionAttribute): MetaRenderedNode | void;
export declare function getSlotContent({ metainfo, slots }: MetaRenderContext, slotName: string, content: string, groupConfig?: MetaGroupConfig): string;
//# sourceMappingURL=render.d.ts.map