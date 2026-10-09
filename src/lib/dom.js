/* global NodeFilter, console, document */

import {
    equals,
    filter,
    flatten,
    groupBy,
    includes,
    length,
    map,
    mean,
    values,
} from 'rambdax'

import { debug } from '~/lib/debug'

const containerTags = [
    // -- Content sectioning
    'ARTICLE',
    // 'ASIDE',
    'MAIN',
    'SECTION',
    // -- Text content
    'BLOCKQUOTE',
    'DIV',
    'FIGURE',
    'UL',
    // -- Tables
    'TABLE',
    'TBODY',
]

export function isVertical (elem) {
    return elem.offsetHeight > elem.offsetWidth
}

export function isVisible (node) {
    const visible = !!(
        node.checkVisibility
            && node.checkVisibility()
            && elementsOverlap(document.body, node)
    )

	return visible
}

export function sameScrollSize (nodeA, nodeB) {
    const sameWidth = equals(nodeA.scrollWidth, nodeB.scrollWidth)
    const sameHeight = equals(nodeA.scrollHeight, nodeB.scrollHeight)

    return sameWidth && sameHeight
}

export function visibleChildren(container) {
    return [...container.children].filter(isVisible)
}

// From https://youmightnotneedjquery.com/#parents
export function parents (node, selector) {
    const parents = []

    while ((node = node.parentNode) && node !== document) {
        if (!selector || node.matches(selector)) parents.push(node)
    }

    return parents
}

// Copyright 2024 Borislav Hadzhiev (ISC License)
// https://bobbyhadz.com/blog/javascript-check-if-two-elements-overlap
function elementsOverlap (elem1, elem2) {
    const bounds1 = elem1.getBoundingClientRect()
    const bounds2 = elem2.getBoundingClientRect()

    return !(
        bounds1.top > bounds2.bottom ||
        bounds1.right < bounds2.left ||
        bounds1.bottom < bounds2.top ||
        bounds1.left > bounds2.right
    )
}

export function findNodesBy (filterFn) {
    const nodeIterator = document.createNodeIterator(
        document.body,
        NodeFilter.SHOW_ELEMENT,
        filterFn,
    )
    const nodes = []
    let currentNode

    while ((currentNode = nodeIterator.nextNode())) {
        nodes.push(currentNode)
    }

    return nodes
}

export function findContainers (minChildCount) {
    const minContainerWidth = 50
    const containers = findNodesBy(
        (node) => {
            const accept =
                node.childElementCount >= minChildCount
                && includes(node.tagName, containerTags)
                && isVisible(node)
                && isVertical(node)
                && node.offsetWidth >= minContainerWidth
                && visibleChildren(node).length > minChildCount
                && !sameScrollSize(document.body, node)
            return accept
                ? NodeFilter.FILTER_ACCEPT
                : NodeFilter.FILTER_REJECT
        }
    )

    return containers
}

export function findSimilarElements (container) {
    const children = [...container.children].filter(isVisible)
    const grouped = groupBy(
        function grouper (node) {
            return (node.tagName && node.classList)
                ? [node.tagName, ...[...node.classList].sort()].join(',')
                : node.tagName
        },
        children
    )
    const similar = values(grouped).filter(list => list.length > 1)

    if (similar.length === 0) return []

    const limit = mean(map(length, similar))
    const result = flatten(filter(nodes => nodes.length >= limit, similar))
    // debug('findSimilarElements:', { limit, result, grouped, similar })

    return result
}
