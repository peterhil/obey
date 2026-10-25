import { filter, isEmpty, prepend } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
// import { syncSet } from '~/store/sync'

export async function topicStore () {
    // const keys = await browser.storage.sync.getKeys()
    // let topics = filter(
    //     (key) => key.startsWith('kw:'),
    //     keys // TODO keys.toSorted()
    // )
    let saved = []  // await browser.storage.sync.get(topics)

    const { subscribe, set, update } = writable(saved)
    debug('topicStorage get:', saved)

    return {
        subscribe,
        add: (topic) => update(
            (topics) => {
                const list = prepend(topic, topics)
                const value = list.toSorted()
                // browser.storage.sync.set(topic)

                return value
            }
        ),
        // remove: (topic) => update(
        //     (topics) => {
        //         const value = filter(item => item !== topic, topics)
        //         browser.storage.sync.remove(topic)

        //         return value
        //     }
        // ),
        set,
        update,
    }
}
