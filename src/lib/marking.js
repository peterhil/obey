import { forEach, isEmpty } from 'rambdax'

import { debug } from '~/lib/debug'
import { findSimilarElements, parents } from '~/lib/dom'
import { hasKeywords, searchKeywords } from '~/lib/regex'
import { iUniq } from '~/lib/utils'

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

export function hideElements (keywords) {
    // TODO Find elements within a container given as input context
    const newElements = document.body.querySelectorAll(
        '[data-obey="container"] [data-obey="element"]:not([data-obey-status])'
    )
    newElements.forEach((element) => {
        checkElement(keywords, element)
    })
}

function markElement (node) {
    node.dataset.obey = 'element'
}

function markContainer (node) {
    const onlySimilar = false
    const mostCommon = onlySimilar ? findSimilarElements(node) : [...node.children]
    const parentContainers = parents(node, '[data-obey="container"]')

    if (!isEmpty(parentContainers)) {
        // debug('Found a wrapper with parent container:', {node, parentContainers})
        node.dataset.obey = 'wrapper'
        return
    }

    node.dataset.obey = 'container'
    node.dataset.obeyChildElementCount = node.childElementCount

    mostCommon.forEach(markElement)
}

function markWrapper (node) {
    if (node.dataset.obey !== 'container') return

    const parentContainers = parents(node, '[data-obey="container"]')

    forEach(
        (node) => {
            // Never mark Facebook feed as wrapper
            if (node.getAttribute('role') === 'feed') return

            node.dataset.obey = 'wrapper'
        },
        parentContainers
    )
}

export async function markContainers (containers) {
    containers.forEach(markContainer)
    containers.forEach(markWrapper)
}
