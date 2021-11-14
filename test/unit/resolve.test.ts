import { isArray, isPlainObject } from '@vue/shared'
import { createMergedObject, ResolveMethod } from '../../src/object-merge'

const resolve: ResolveMethod = <T>(sources: T[]) => {
  // console.log('RESOLVE\n', sources)

  const hasArrayOption = sources.some(source => isArray(source))
  if (hasArrayOption) {
    const groupedOptions: Record<string, object> = {}
    for (const source of sources) {
      if (!isArray(source)) {
        continue
      }

      for (const value of source) {
        if (isPlainObject(value) && 'vmid' in value) {
          // @ts-ignore
          groupedOptions[value.vmid] = value
        }
      }
    }

    // console.log('GROUPED OPTIONS', groupedOptions)
    const values = []
    for (const source of sources) {
      if (!isArray(source)) {
        continue
      }

      for (const value of source) {
        if (!isPlainObject(value) || !('vmid' in value)) {
          values.push(value)
        // @ts-ignore
        } else if (groupedOptions[value.vmid]) {
          // @ts-ignore
          values.push(groupedOptions[value.vmid])
          // @ts-ignore
          delete groupedOptions[value.vmid]
        }
      }
    }

    // console.log('WILL USE THESE VALUES', values)
    return values
  }

  return sources[sources.length - 1]
}

describe('resolve', () => {
  test('resolve (string)', () => {
    const source1 = {
      str: 'string value 1'
    }

    const source2 = {
      str: 'string value 2'
    }

    type Source = { str?: string }

    const { context, addSource, delSource } = createMergedObject<Source>(resolve, {})
    const { active } = context

    // Set initial value & init proxy
    addSource(source1)
    const proxy2 = addSource(source2, undefined, true /* do an initial compute/walk of all sources */)

    expect(active.str).toBe('string value 2')

    proxy2.str = 'test'

    expect(active.str).toBe('test')

    delSource(proxy2)

    expect(active.str).toBe('string value 1')

    delSource(source1)

    expect(active.str).toBeUndefined()
  })

  test('resolve (object)', () => {
    const source1 = {
      obj: {
        key: 'object value 1'
      }
    }

    const source2 = {
      obj: {
        key: 'object value 2'
      }
    }

    type Source = { obj?: { key?: string } }

    const { context, addSource, delSource } = createMergedObject<Source>(resolve, {})
    const { active } = context

    // Set initial value & init proxy
    const proxy1 = addSource(source1)
    const proxy2 = addSource(source2, undefined, true /* do an initial compute/walk of all sources */)

    expect(active.obj.key).toBe('object value 2')

    proxy2.obj.key = 'test'

    expect(active.obj.key).toBe('test')

    proxy2.obj = { key: 'test again' }

    expect(active.obj.key).toBe('test again')

    delSource(source2)

    expect(active.obj.key).toBe('object value 1')

    delSource(proxy1)

    expect(active.obj).toBeUndefined()
    expect(active).toEqual({})
  })

  test('resolve (array)', () => {
    const source1 = {
      arr: [
        'array value 1'
      ]
    }

    const source2 = {
      arr: [
        'array value 2'
      ]
    }

    const { context, addSource, delSource } = createMergedObject(resolve, {})
    const { active, sources } = context

    // Set initial value & init proxy
    const proxy1 = addSource(source1)
    const proxy2 = addSource(source2, undefined, true /* do an initial compute/walk of all sources */)

    expect(active.arr).toEqual(['array value 1', 'array value 2'])

    proxy2.arr[0] = 'test 2'

    expect(active.arr).toEqual(['array value 1', 'test 2'])

    proxy1.arr = ['test 1']

    expect(active.arr).toEqual(['test 1', 'test 2'])
    expect(sources.length).toBe(2)

    delSource(source1)

    expect(active.arr).toEqual(['test 2'])

    delete proxy2.arr

    expect(active.arr).toBeUndefined()
    expect(sources.length).toBe(1)

    proxy2.arr = ['test again 2.1']
    expect(active.arr).toEqual(['test again 2.1'])

    proxy1.arr = ['test again 1']
    addSource(proxy1, undefined, true)
    expect(active.arr).toEqual(['test again 2.1', 'test again 1'])

    proxy2.arr = []
    proxy2.arr[0] = 'test again 2.2'
    expect(active.arr).toEqual(['test again 2.2', 'test again 1'])
  })

  test('resolve (collection)', () => {
    const source1 = {
      arr: [
        { key: 'collection value 1.1' },
        { vmid: 'a', key: 'collection value 1.2' }
      ]
    }

    const source2 = {
      arr: [
        { vmid: 'a', key: 'collection value 2.1' },
        { vmid: 'b', key: 'collection value 2.2' }
      ]
    }

    type Source = {
      arr?: {
        vmid?: string,
        key: string
      }[]
    }

    const { context, addSource, delSource } = createMergedObject<Source>(resolve, {})
    const { active, sources } = context

    // Set initial value & init proxy
    const proxy1 = addSource(source1)
    const proxy2 = addSource(source2, undefined, true /* do an initial compute/walk of all sources */)

    expect(active.arr).toEqual([
      { key: 'collection value 1.1' },
      { vmid: 'a', key: 'collection value 2.1' },
      { vmid: 'b', key: 'collection value 2.2' }
    ])

    proxy1.arr[0].key = 'test 1.1'
    proxy1.arr[1].key = 'test 1.2'

    expect(active.arr).toEqual([
      { key: 'test 1.1' },
      { vmid: 'a', key: 'collection value 2.1' },
      { vmid: 'b', key: 'collection value 2.2' }
    ])

    proxy2.arr = [
      { vmid: 'b', key: 'collection value 2.1' },
      { vmid: 'c', key: 'collection value 2.2' }
    ]

    expect(active.arr).toEqual([
      { key: 'test 1.1' },
      { vmid: 'a', key: 'test 1.2' },
      { vmid: 'b', key: 'collection value 2.1' },
      { vmid: 'c', key: 'collection value 2.2' }
    ])

    expect(sources.length).toBe(2)

    delSource(proxy1)

    expect(sources.length).toBe(1)
    expect(active.arr).toEqual([
      { vmid: 'b', key: 'collection value 2.1' },
      { vmid: 'c', key: 'collection value 2.2' }
    ])

    delete proxy2.arr

    expect(active.arr).toBeUndefined()
    expect(active).toEqual({})

    const proxy3 = addSource({ arr: [{ vmid: 'a', key: 'test again 1' }] }, undefined, true)

    expect(sources.length).toBe(2)
    expect(active.arr).toEqual([{ vmid: 'a', key: 'test again 1' }])

    expect(sources[0]).toBe(proxy2)
    expect(sources[1]).toBe(proxy3)

    proxy2.arr = [{ vmid: 'a', key: 'test again 2' }]

    // This is still test again 1 because proxy3 is added after proxy2,
    // and the resolve method returns the last value
    expect(active.arr).toEqual([{ vmid: 'a', key: 'test again 1' }])
  })
})
