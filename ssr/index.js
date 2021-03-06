/**
 * vue-meta v3.0.0-alpha.9
 * (c) 2021
 * - Pim (@pimlie)
 * - All the amazing contributors
 * @license MIT
 */

async function renderMetaToString(app, ctx = {}) {
    // TODO: better way of determining whether meta was rendered with the component or not
    if (!ctx.teleports || !ctx.teleports.head) {
        const { renderToString } = await import('@vue/server-renderer');
        const teleports = app.config.globalProperties.$metaManager?.render();
        await Promise.all(teleports.map((teleport) => renderToString(teleport, ctx)));
    }
    const { teleports } = ctx;
    for (const target in teleports) {
        if (target.endsWith('Attrs')) {
            const str = teleports[target];
            // match from first space to first >, these should be all rendered attributes
            teleports[target] = str.slice(str.indexOf(' ') + 1, str.indexOf('>'));
        }
    }
    return ctx;
}

export { renderMetaToString };
