import { forEach } from 'rambdax'

import { findSimilarElements, parents } from '~/lib/dom'

function markElement (node) {
    node.dataset.obey = 'element'
}

function markContainer (node) {
    const onlySimilar = false
    const mostCommon = onlySimilar ? findSimilarElements(node) : [...node.children]

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
