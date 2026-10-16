// import escapeRegexp from 'escape-string-regexp'
import { match } from 'rambdax'

function regexpPattern (keywords) {
    const pattern = '(' + keywords.join('|') + ')'

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
