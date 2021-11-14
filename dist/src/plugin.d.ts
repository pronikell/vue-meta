import { App, ComponentOptionsMixin } from 'vue';
export declare type PluginOptions = {
    keyName: string;
};
export declare const defaultOptions: PluginOptions;
declare type CreateMixin = (options: PluginOptions) => ComponentOptionsMixin;
export declare const createMixin: CreateMixin;
export declare const install: (app: App, _options?: Partial<PluginOptions>) => void;
export {};
//# sourceMappingURL=plugin.d.ts.map