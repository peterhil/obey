import { sort, uniqWith } from 'rambdax'

// Case insensitive unique and sorted strings
export const iSort = sort((a, b) => a.toLowerCase() > b.toLowerCase())
export const iUniq = uniqWith((x, y) => x.toLowerCase() === y.toLowerCase())

// Strip given regexp 're' from both ends of a string
export function strip (str, re) {
    const regex = new RegExp('(^' + re + '|' + re + '$)', 'g')

    return str.replaceAll(regex, '')
}

// Strip word boundary assertions '\b' from both ends of a string
export const stripBoundaries = (str) => strip(str, '\\\\b')
