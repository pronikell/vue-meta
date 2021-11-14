# Special cases

::: tip Read first
Understanding [How is metaInfo resolved?](/faq/#concatenate-metadata) is probably a prerequisite for these cases
:::

## Remove parent property by child

If a child returns `null` as content value then the parent metaInfo property with the same `vmid` will be ignored

:::tip Content value
With content value we mean the following value of a `metaInfo` property:
- the value of a key for `object` types as [`htmlAttrs`](/api/#htmlattrs)
- the value of `[contentKeyName]` or `innerHTML` keys for `collection` types as [`meta`](/api/#meta)
:::

The following might be a bit far-fetched, but its just an example
```js
// parent
metaInfo: {
  style: [{
    vmid: 'page-load-overlay',
    innerHTML: `
      body div.loading {
        z-index: 999;
        background-color: #0f0f0f;
        opacity: 0.9;
      }
    `,
  }]
}

// dynamically loaded child
metaInfo() {
  const style = this.cssTexts
  return { style }
},
data() {
  return {
    this.cssTexts: []
  }
},
mounted() {
  this.cssTexts.push({
    vmid: 'page-load-overlay',
    innerHTML: null
  })
}
```

## Use child property conditionally

If you wish to use a child property conditionally and use the parents' property as default value, make sure the child returns `undefined` as content value

:::tip Content value
With content value we mean the following value of a `metaInfo` property:
- the value of a key for `object` types as [`htmlAttrs`](/api/#htmlattrs)
- the value of `[contentKeyName]` or `innerHTML` keys for `collection` types as [`meta`](/api/#meta)
:::

The below example will still show a description when the GET in the child fails
```js
// parent
metaInfo: {
  meta: [{
    vmid: 'description',
    name: 'description',
    content: 'my standard description',
  }]
}

// child
metaInfo() {
  return {
    meta: [{
      vmid: 'description',
      name: 'description',
      content: this.description,
    }]
  }
},
data() {
  return {
    description: undefined
  }
},
methods: {
  getDescription() {
    this.description = this.$axios.get()
    if (!this.description) {
      // if GET request failed or returned empty,
      // explicitly set to undefined so the parents'
      // default description is used
      this.description = undefined
    }
  }
}
```

## Boolean attributes

`vue-meta` maintains a [list](https://github.com/nuxt/vue-meta/blob/master/src/shared/constants.js) of attributes which are Boolean attributes according to the HTML specs (and some extra). Whatever value you will pass to these attributes, they will be rendered as a Boolean attribute.<sup>*</sup>

<sup>*</sup><small>Except for the special values `undefined` and `null`, see above</small>

:::tip Note
Prior to `v2.0` any attribute key with `undefined` as value was rendered as Boolean attribute. This has been removed as bundlers often remove object properties with an `undefined` value as given `a = {}` then `a.a === undefined`
:::
