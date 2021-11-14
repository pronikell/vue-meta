declare const createMetaManager: (isSSR?: boolean) => import("../../src/manager").MetaManager;
declare const createRouter: (base: string, isSSR?: boolean) => import("vue-router").Router;
declare const createApp: (base: string, isSSR?: null) => {
    app: import("vue").App<Element>;
    router: import("vue-router").Router;
    metaManager: import("../../src/manager").MetaManager;
};
export { createApp, createMetaManager, createRouter };
//# sourceMappingURL=main.d.ts.map