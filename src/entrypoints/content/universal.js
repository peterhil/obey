/* global document */

import { debounce, isEmpty } from 'rambdax'

import { debug, isDev } from '~/lib/debug'
import { findContainers } from '~/lib/dom'
import { hasKeywords, searchKeywords } from '~/lib/regex'
import { iUniq } from '~/lib/utils'
import { loadRules } from '~/lib/options'
import { markContainers } from '~/lib/marking'

function addDetails (element, reason, keywords) {
    const children = element.childNodes
    const details = document.createElement('details')
    const summary = document.createElement('summary')
    const usePrepend = !!document.location.origin.match('facebook.com')

    summary.innerText = reason
    // debug('addDetails:', {element, reason})

    if (element.tagName === 'TR') {
        const cells = element.querySelectorAll('td')

        element.dataset.obeyStatus = 'skip'

        cells.forEach((cell) => {
            if (hasKeywords(keywords, cell.innerText)) {
                checkElement(keywords, cell)
            }
        })
    }
    else {
        element.dataset.obeyStatus = 'hidden'

        // Use compromise prepend method on Facebook
        if (usePrepend) {
            details.classList.add('obey-prepend')
            details.append(summary)
            element.prepend(details)
        }
        // The default method is searchable
        else {
            details.classList.add('obey')
            details.replaceChildren(summary, ...children)
            element.replaceChildren(details)
        }
    }
}

function getReason (matches) {
    const sorted = iUniq(matches.sort())
    const reason = sorted.join(', ')

    return reason
}

function checkElement (keywords, element) {
    const matches = searchKeywords(keywords, element.innerText)
    const hide = !isEmpty(matches)

    // Avoid recursion with TR elements
    if (element.dataset.obeyStatus === 'skip') return false

    if (hide) {
        const reason = getReason(matches)

        addDetails(element, reason, keywords)
    }

    return hide
}

function hideElements (keywords) {
    // TODO Find elements within a container given as input context
    const newElements = document.body.querySelectorAll(
        '[data-obey="container"] [data-obey="element"]:not([data-obey-status])'
    )
    newElements.forEach((element) => {
        checkElement(keywords, element)
    })
}

export async function obey () {
    const minChildCount = 5
    const minWidth = 50
    const containers = await findContainers(minChildCount, minWidth)
    const keywords = await loadRules(document.location.host)

    debug('Checking content:', { containers, keywords })
    if (isDev) document.body.classList.add('obey-debug')

    await markContainers(containers)
    await hideElements(keywords)
}
