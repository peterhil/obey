import './style.css'

import { obey, onRequest } from './universal'

export default defineContentScript({
    matches: ['<all_urls>'],
    runAt: 'document_idle',
    main() {
        obey()
        browser.runtime.onMessage.addListener(onRequest)
    },
})
