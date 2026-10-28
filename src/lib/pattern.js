import {
    filter,
    identity,
    join,
    map,
    pick,
    sortByProps,
    toPairs,
} from 'rambdax'

export const fields = [
    'protocol',
    'hostname',
    'port',
    'pathname',
    'search',
    'hash',
]

export function cleanPattern (up) {
    return filter(v => v && v !== '*', pick(fields, up))
}

function maybe(field, obj) {
    return obj[field] ? obj[field] : ''
}

function maybePrefix(field, prefix, obj) {
    return obj[field] ? prefix + obj[field] : ''
}

function maybeSuffix(field, suffix, obj) {
    return obj[field] ? obj[field] + suffix : ''
}

export function patternToInput (p) {
    const protocol = maybeSuffix('protocol', '://', p)
    const host = join(':', filter(identity, [p.hostname, p.port]))
    const pathname = maybe('pathname', p)
    const search = maybePrefix('search', '?', p)
    const hash = maybePrefix('hash', '#', p)

    return join('', [
        protocol,
        host,
        pathname,
        search,
        hash,
    ])
}

export function sortPatternMap (patternPairs) {
    const sorted = sortByProps(
        map(field => '1.up.' + field, fields),
        patternPairs
    )

    return new Map(sorted)
}
