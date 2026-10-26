import { nanoid } from 'nanoid'
import { append, filter, isEmpty, sortObject, startsWith, toPairs } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { iSort, iUniq } from '~/lib/utils'
import { syncSet } from '~/store/sync'

export const topicSorter = (x, y, a, b) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1

async function createTopics () {
    const allKeys = await browser.storage.sync.getKeys()
    const keys = filter(startsWith('kw:'), allKeys)
    const saved = await browser.storage.sync.get(keys)
    const sorted = sortObject(topicSorter, saved)
    const topics = new Map(toPairs(sorted))
    const { subscribe, set, update } = writable(topics)
    debug('topicStorage get:', {sorted, topics})

    return {
        subscribe,
        add: (subject) => update(
            (topics) => {
                const id = 'kw:' + nanoid()
                const topic = {
                    name: subject,
                    hide: [],
                }

                syncSet(id, topic)
                topics.set(id, topic)

                return topics
            }
        ),
        remove: (id) => update(
            (topics) => {
                topics.delete(id)
                browser.storage.sync.remove(id)

                return topics
            }
        ),
        get: (id) => {
            return topics.get(id)
        },
        addWord: (id, word) => update(
            (topics) => {
                const topic = topics.get(id)

                topic.hide = iSort(iUniq([word, ...(topic.hide || [])]))
                syncSet(id, topic)
                topics.set(id, topic)

                return topics
            }
        ),
        removeWord: (id, word) => update(
            (topics) => {
                const topic = topics.get(id)

                topic.hide = filter(item => item !== word, topic.hide)
                syncSet(id, topic)
                topics.set(id, topic)

                return topics
            }
        ),
        set,
        update,
    }
}

export const topics = await createTopics()
