export function cleanKeywords (words) {
    return words.join(', ').replace(/\\b/g, '')
}
