import { nanoid } from 'nanoid'
import { filter, isEmpty, prepend, sortObject, startsWith, toPairs } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { syncSet } from '~/store/sync'

async function createPatterns () {
    const allSites = {
        "id": "up:*",
        "protocol": "*",
        "hostname": "*",
        "kw": [],
    }
    const allKeys = await browser.storage.sync.getKeys()
    const keys = filter(startsWith('up:'), allKeys)
    const saved = await browser.storage.sync.get(keys)
    // const sorted = sortObject(topicSorter, saved)
    const patterns = new Map(toPairs(saved))

    const { subscribe, set, update } = writable(patterns)
    debug('patternStorage get:', patterns)

    return {
        subscribe,
        add: (urlPattern, kw = []) => update(
            (patterns) => {
                const id = 'up:' + nanoid()
                const pattern = {
                    up: urlPattern,  // TODO Clean default fields
                    kw,
                }

                syncSet(id, pattern)
                patterns.set(id, pattern)

                return pattern
            }
        ),
        remove: (id) => update(
            (patterns) => {
                patterns.delete(id)
                browser.storage.sync.remove(id)

                return patterns
            }
        ),
        set,
        update,
    }
}

export const patterns = await createPatterns()
