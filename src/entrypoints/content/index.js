/* global MutationObserver, browser, defineContentScript */

import '~/common.css'
import './style.css'

import { debounce } from 'rambdax'

import { debug } from '~/lib/debug'
import { obey } from './universal'

const debouncedObey = debounce(obey, 1500)

const onRequest = (request) => {
    if (request.type === 'xhr' && request.details.thirdParty === false) {
        debug('XmlHttpRequest:', { request })
        debouncedObey()
    }
}

const onMutation = (mutations) => {
    debug('Mutations:', mutations)
    debouncedObey()
}

const onNavigation = (event) => {
    debug('Navigation:', {event})
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
