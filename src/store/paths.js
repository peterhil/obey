import { filter, isEmpty, prepend } from 'rambdax'
import { writable } from 'svelte/store'

import { debug } from '~/lib/debug'
import { syncSet } from '~/store/sync'

export async function pathStorage () {
    const allSites = '*'
    const keys = await browser.storage.sync.getKeys()
    const paths = filter(
        (key) => !key.startsWith('obey:'),
        keys.toSorted()
    )

    if (isEmpty(paths)) {
        await syncSet(allSites, [])
        paths = [allSites]
    }
    const { subscribe, set, update } = writable(paths)
    debug('pathStorage get:', paths)

    return {
        subscribe,
        add: (path) => update(
            (paths) => {
                const list = prepend(path, paths || [allSites])
                const value = list.toSorted()

                return value
            }
        ),
        remove: (path) => update(
            (paths) => {
                const value = filter(item => item !== path, paths)
                browser.storage.sync.remove(path)

                return value
            }
        ),
        set,
        update,
    }
}
