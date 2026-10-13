/* global MutationObserver, browser, defineContentScript */

import './style.css'

import { debounce } from 'rambdax'

import { debug } from '~/lib/debug'
import { obey } from './universal'

export const onRequest = debounce((request) => {
    if (request.type === 'xhr' && request.details.thirdParty === false) {
        debug('XmlHttpRequest:', { request })
        obey()
    }
}, 1500)

export const onMutation = debounce((mutations) => {
    debug('Mutations:', mutations)
    obey()
}, 1500)

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_idle',
    main (ctx) {
        if (ctx.isValid) {
            const observer = new MutationObserver(onMutation)

            obey()

            observer.observe(document.body, { childList: true, subtree: true })
            browser.runtime.onMessage.addListener(onRequest)

            const removeInvalidatedListeners = ctx.onInvalidated(() => {
                observer.disconnect()
                browser.runtime.onMessage.removeListener(onRequest)
            })
            removeInvalidatedListeners()
        }
        else {
            debug('Context invalidated!')
        }
    },
})
