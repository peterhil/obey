import { filter, prepend } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { iSort, iUniq } from '~/lib/utils'

async function syncSet (path, value) {
    const obj = {[path]: value}
    await browser.storage.sync.set(obj)
    debug('wordStorage syncSet:', obj)
}

export async function wordStorage (path, defaultValue = []) {
    const saved = await browser.storage.sync.get(path)
    const value = saved[path] || defaultValue
    const { subscribe, set, update } = writable(value)
    debug('wordStorage get:', path, value)

    return {
        subscribe,
        add: (word) => update(
            (words) => {
                const list = prepend(word, words || [])
                const value = iSort(iUniq(list))

                syncSet(path, value)
                return value
            }
        ),
        remove: (word) => update(
            (words) => {
                const value = filter(item => item !== word, words)

                syncSet(path, value)
                return value
            }
        ),
        set: async (value) => {
            await syncSet(path, value)
            return set(value)
        },
        update,
    }
}
