import { sort, uniqWith } from 'rambdax'

// Strip given regexp 're' from both ends of a string
export function strip (str, re) {
    const regex = new RegExp('(^' + re + '|' + re + '$)', 'g')

    return str.replaceAll(regex, '')
}

// Strip word boundary assertions '\b' from both ends of a string
export const stripBoundaries = (str) => strip(str, '\\\\b')

// Case insensitive unique and sorted strings
const normalise = (str) => stripBoundaries(str).toLowerCase()
export const iSort = sort((a, b) => normalise(a) > normalise(b))
export const iUniq = uniqWith((x, y) => normalise(x) === normalise(y))

// Domains
export const topLevelDomain = (hostname) => {
    return hostname.split('.').slice(-2).join('.')
}
