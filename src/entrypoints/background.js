import { debug } from '~/lib/debug'

function onInstalled (details) {
    browser.storage.sync.set({storageVersion: 1})
    if (!details.temporary) browser.runtime.openOptionsPage()
    debug('Installed:', details)
}

export default defineBackground(() => {
    // debug('Background:', { id: browser.runtime.id })
    browser.runtime.onInstalled.addListener(onInstalled)
})
