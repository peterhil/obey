import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'

export async function wordStorage (path, defaultValue = []) {
    const saved = await browser.storage.sync.get(path)
    const value = saved[path] || defaultValue
    const { subscribe, set, update } = writable(value)
    debug('wordStorage get:', path, value)

    return {
        subscribe,
        set: async (value) => {
            const obj = {[path]: value}
            await browser.storage.sync.set(obj)
            debug('wordStorage set:', {obj, path, value})

            return set(value)
        },
        update,
    }
}
