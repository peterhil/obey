import { filter, isEmpty, prepend } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { syncSet } from '~/store/sync'

async function createPatterns () {
    const allSites = '*'
    const keys = await browser.storage.sync.getKeys()
    let patterns = filter(
        (key) => !key.startsWith('obey:') && !key.startsWith('kw:'),
        keys.toSorted()
    )

    if (isEmpty(patterns)) {
        await syncSet(allSites, [])
        patterns = [allSites]
    }
    const { subscribe, set, update } = writable(patterns)
    debug('patternStorage get:', patterns)

    return {
        subscribe,
        add: (pattern) => update(
            (patterns) => {
                const list = prepend(pattern, patterns || [allSites])
                const value = list.toSorted()

                return value
            }
        ),
        remove: (pattern) => update(
            (patterns) => {
                const value = filter(item => item !== pattern, patterns)
                browser.storage.sync.remove(pattern)

                return value
            }
        ),
        set,
        update,
    }
}

export const patterns = await createPatterns()
