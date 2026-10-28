/* global MutationObserver, URLPattern, document, window */

if (!globalThis.URLPattern) {
  await import("urlpattern-polyfill")
}

import '~/assets/common.css'
import './style.css'

import { debounce, filter, flatten, includes, isEmpty, map, pluck, values } from 'rambdax'

import { debug, isDev } from '~/lib/debug'
import { findContainers } from '~/lib/dom'
import { hideElements, markContainers } from '~/lib/marking'
import { syncGetPrefix } from '~/store/sync'

async function updateKeywords (host) {
    const saved = await syncGetPrefix('up:')
    const patterns = filter(
        (pattern) => {
            const up = new URLPattern({...pattern.up, protocol: "*"}, {ignoreCase: true})

            return up.test(host)
        },
        values(saved)
    )
    const ids = flatten(pluck('kw', patterns))
    const topics = await browser.storage.sync.get(ids)
    const keywords = flatten(pluck('hide', values(topics)))
    debug('updateKeywords:', { host, patterns, keywords, topics })

    return keywords
}

async function obey () {
    const minChildCount = 5
    const minWidth = 50
    const containers = await findContainers(minChildCount, minWidth)
    const keywords = await updateKeywords(document.location.href)

    debug('Checking content:', { containers, keywords })
    if (isDev) document.body.classList.add('obey-debug')

    await markContainers(containers)

    if (isEmpty(keywords)) return

    await hideElements(keywords)
}

const debouncedObey = debounce(obey, 1500)

const onRequest = (request) => {
    if (request.type === 'xhr' && request.details.thirdParty === false) {
        debug('XmlHttpRequest:', { request })
        debouncedObey()
    }
}

const onMutation = (mutations) => {
    // debug('Mutations:', mutations)
    debouncedObey()
}

const onNavigation = (event) => {
    const host = event.newUrl.host

    debug('Navigation:', {host, event})
    debouncedObey()
}

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_idle',
    main (ctx) {
        if (ctx.isValid) {
            const observer = new MutationObserver(onMutation)

            obey()

            observer.observe(document.body, { childList: true, subtree: true })
            browser.runtime.onMessage.addListener(onRequest)
            ctx.addEventListener(window, 'wxt:locationchange', onNavigation)

            const removeInvalidatedListeners = ctx.onInvalidated(() => {
                observer.disconnect()
                browser.runtime.onMessage.removeListener(onRequest)
                ctx.removeEventListener(window, 'wxt:locationchange', onNavigation)
            })
            removeInvalidatedListeners()
        }
        else {
            debug('Context invalidated!')
        }
    },
})
