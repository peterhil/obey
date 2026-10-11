import { sort, uniqWith } from 'rambdax'

// Case insensitive unique and sorted strings
export const iSort = sort((a, b) => a.toLowerCase() > b.toLowerCase())
export const iUniq = uniqWith((x, y) => x.toLowerCase() === y.toLowerCase())
