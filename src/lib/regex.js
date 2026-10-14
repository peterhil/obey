// import escapeRegexp from 'escape-string-regexp'
import { match } from 'rambdax'

function regexpPattern (keywords) {
    const keys = keywords.map(RegExp.escape)
    const pattern = '\\b(' + keys.join('|') + ')\\b'

    return pattern
}

export function hasKeywords (keywords, text) {
    const re = new RegExp(regexpPattern(keywords), 'giu')
    return re.test(text)
}

export function searchKeywords (keywords, text) {
    const re = new RegExp(regexpPattern(keywords), 'giu')
    return match(re, text)
}
