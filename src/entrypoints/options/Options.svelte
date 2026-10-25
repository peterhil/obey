<script>
    import { prepend, sort } from 'rambdax'
    import { onMount } from 'svelte'

    import KeywordList from '~/component/KeywordList.svelte'
    import Topics from '~/component/Topics.svelte'

    import { debug } from '~/lib/debug'
    // import { defaultRules } from '~/lib/options'
    import { pathStorage } from '~/store/paths'
    import { topicStore } from '~/store/topicStore'

    const paths = await pathStorage()
    const topics = await topicStore()

    async function onAddPath (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const path = data.get('path')

        event.preventDefault()

        // Create new storage key
        paths.add(path)
        debug('Add path:', {path})
    }
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    <Topics {topics}></Topics>

    <h2>URL patterns</h2>

    <form onsubmit={onAddPath}>
        <label>
            Add domain or path:
            <input name="path" type="text">
        </label>
    </form>

    {#each $paths as path (path)}
        <KeywordList {path}></KeywordList>
    {/each}
</div>
