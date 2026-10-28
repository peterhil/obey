import { filter, filterIndexed, identity, includes, join, pick } from 'rambdax'

export const fields = [
    'protocol',
    'hostname',
    'pathname',
    'port',
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
