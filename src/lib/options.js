import { filter, flatten, values } from 'rambdax'

// TODO Implement options UI
export const defaultRules = {
    '*': [
        'AI',
        'Elon Musk',
        'Orpo',
        'Purra',
        'Tekoäly',
        'Trump',
    ],
    'facebook.com': [
        'Follow',
        'Reels',
    ],
    'linkedin.com': [
        'Applied',
        'Java',
        'LLM',
        'LLMs',
        'On-site',
        'Php',
        'Power platform',
        'Promoted',
        'Viewed',
    ],
    'startpage.com': [
        'w3schools.com',
    ],
}

export async function loadRules (url) {
    const matched = filter(
        (_, path) => {
            return (path === '*' || !!url.match(path))
        },
        defaultRules)
    const rules = flatten(values(matched))

    // debug('Matched rules:', { matched, rules })

    return rules
}
