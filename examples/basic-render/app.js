import Vue from 'vue'
import VueMeta from 'vue-meta'

Vue.use(VueMeta)

Vue.component('Child', {
  name: 'Child',
  props: {
    page: {
      type: String,
      default: ''
    }
  },
  render (h) {
    return h('h3', null, this.page)
  },
  metaInfo () {
    return {
      title: this.page
    }
  }
})

new Vue({
  template: `
    <div id="app">
      <h1>Basic Render</h1>
      <p>Inspect Element to see the meta info</p>
      <child page="This is a prop"></child>
    </div>
  `
}).$mount('#app')
