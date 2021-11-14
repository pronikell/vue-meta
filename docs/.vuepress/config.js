module.exports = {
  plugins: {
    '@vuepress/google-analytics': {
      ga: 'UA-88662854-1',
    },
    '@vuepress/plugin-pwa': {
      serviceWorker: true
    }
  },
  locales: {
    '/': {
      lang: 'en-US',
      title: 'Vue Meta',
      description: 'HTML Metadata manager for Vue.js'
    },
  },
  themeConfig: {
    repo: 'nuxt/vue-meta',
    docsDir: 'docs',
    locales: {
      '/': {
        label: 'English',
        selectText: 'Languages',
        editLinkText: 'Edit this page on GitHub',
        nav: [
          { text: 'Guide', link: '/guide/' },
          { text: 'API', link: '/api/' },
          { text: 'Release Notes', link: 'https://github.com/nuxt/vue-meta/releases' }
        ],
        sidebar: [
          '/',
          {
            title: 'Getting started',
            collapsable: false,
            children: [
              '/guide/',
              '/guide/preparing',
              '/guide/ssr',
              '/guide/frameworks'
            ]
          },
          {
            title: 'Usage',
            collapsable: false,
            children: [
              '/guide/metainfo',
              '/guide/special',
              '/guide/caveats',
              '/guide/multiple-apps',
            ]
          },
          {
            title: 'FAQ',
            collapsable: false,
            children: [
              '/faq/',
              '/faq/performance.md',
              '/faq/prevent-initial.md',
              '/faq/component-props.md',
              '/faq/async-action.md',
              '/faq/chaining.md',
            ]
          }
        ]
      },
    }
  }
}
