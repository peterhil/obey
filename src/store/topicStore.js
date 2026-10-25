import { nanoid } from 'nanoid'
import { append, filter, isEmpty, sortByProps } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
// import { syncSet } from '~/store/sync'

export async function topicStore () {
    // const keys = await browser.storage.sync.getKeys()
    // let topics = filter(
    //     (key) => key.startsWith('kw:'),
    //     keys
    // )
    let saved = []  // await browser.storage.sync.get(topics)

    const { subscribe, set, update } = writable(saved)
    debug('topicStorage get:', saved)

    return {
        subscribe,
        add: (subject) => update(
            (previous) => {
                const id = 'kw:' + nanoid()
                const topic = {
                    id,
                    name: subject,
                    hide: [],
                }
                const list = append(topic, previous)
                const topics = sortByProps(['name'], list)
                browser.storage.sync.set({[id]: topic})

                return topics
            }
        ),
        // remove: (topic) => update(
        //     (previous) => {
        //         const value = filter(item => item.id !== topic.id, previous)
        //         browser.storage.sync.remove(topic.id)

        //         return value
        //     }
        // ),
        set,
        update,
    }
}
