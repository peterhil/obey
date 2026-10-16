import { debug } from '~/lib/debug'

export async function syncSet (path, value) {
    const obj = {[path]: value}
    await browser.storage.sync.set(obj)
    debug('wordStorage syncSet:', obj)
}
