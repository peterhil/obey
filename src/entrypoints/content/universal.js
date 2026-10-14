import { debug, isDev } from '~/lib/debug'
import { findContainers } from '~/lib/dom'
import { loadRules } from '~/lib/options'
import { hideElements, markContainers } from '~/lib/marking'

export async function obey () {
    const minChildCount = 5
    const minWidth = 50
    const containers = await findContainers(minChildCount, minWidth)
    const keywords = await loadRules(document.location.host)

    debug('Checking content:', { containers, keywords })
    if (isDev) document.body.classList.add('obey-debug')

    await markContainers(containers)
    await hideElements(keywords)
}
