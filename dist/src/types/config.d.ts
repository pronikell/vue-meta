export declare type MetaConfigSectionKey = 'tag' | 'to' | 'keyAttribute' | 'valueAttribute' | 'nameless' | 'group' | 'namespaced' | 'namespacedAttribute' | 'attributesFor';
export interface MetaConfigSectionTag {
    tag?: string;
    to?: string;
    keyAttribute?: string;
    valueAttribute?: string;
    nameless?: boolean;
}
export declare type MetaConfigSectionGroup = {
    group: boolean;
    namespaced?: boolean;
    namespacedAttribute?: boolean;
};
export declare type MetaConfigSectionAttribute = {
    attributesFor: string;
};
export declare type MetaConfigSection = MetaConfigSectionGroup | MetaConfigSectionTag | MetaConfigSectionAttribute;
export interface MetaConfig {
    [key: string]: MetaConfigSection;
}
export declare type MetaTagConfigKey = 'keyAttribute' | 'contentAsAttribute' | 'attributes';
export interface MetaTagConfig {
    keyAttribute?: string;
    contentAsAttribute?: boolean | string;
    attributes: boolean | Array<string>;
}
export declare type MetaTagName = 'title' | 'base' | 'meta' | 'link' | 'style' | 'script' | 'noscript';
export declare type MetaTagsConfig = {
    [key in MetaTagName]: MetaTagConfig;
};
//# sourceMappingURL=config.d.ts.map