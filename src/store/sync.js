import { filter, startsWith } from 'rambdax'

import { debug } from '~/lib/debug'

export async function syncGetPrefix (prefix) {
    const allKeys = await browser.storage.sync.getKeys()
    const keys = filter(startsWith(prefix), allKeys)
    const saved = await browser.storage.sync.get(keys)

    return saved
}

export async function syncSet (path, value) {
    const obj = {[path]: value}
    await browser.storage.sync.set(obj)
    debug('syncSet:', obj)
}
