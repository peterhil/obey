import { nanoid } from 'nanoid'
import { toPairs, uniq } from 'rambdax'
import { derived, writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { sortPatternMap } from '~/lib/pattern'
import { syncGetPrefix, syncSet } from '~/store/sync'

async function createPatterns () {
    const saved = await syncGetPrefix('up:')
    let patterns = sortPatternMap(toPairs(saved))

    const { subscribe, set, update } = writable(patterns)
    debug('patternStorage get:', patterns)

    return {
        subscribe,
        add: (urlPattern, kw = []) => update(
            (patterns) => {
                const id = 'up:' + nanoid()
                const pattern = {
                    up: urlPattern,
                    kw,
                }

                syncSet(id, pattern)
                patterns.set(id, pattern)

                return patterns
            }
        ),
        remove: (id) => update(
            (patterns) => {
                patterns.delete(id)
                browser.storage.sync.remove(id)

                return patterns
            }
        ),
        addKeyword: (id, topicId) => update(
            (patterns) => {
                const pattern = patterns.get(id)
                const keywords = uniq([...pattern.kw, topicId])

                pattern.kw = keywords

                syncSet(id, pattern)
                patterns.set(id, pattern)

                return patterns
            }
        ),
        set,
        update,
    }
}

export const patterns = await createPatterns()
export const sortedPatterns = derived(
    patterns,
    ($patterns) => {
        const pairs = [...$patterns.entries()]
        const sorted = sortPatternMap(pairs)
        debug('sortedPatterns store:', sorted)

        return sorted
    }
)
