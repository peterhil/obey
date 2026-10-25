<script>
    import { prepend, sort } from 'rambdax'
    import { onMount } from 'svelte'

    import KeywordList from '~/component/KeywordList.svelte'
    import { debug } from '~/lib/debug'
    // import { defaultRules } from '~/lib/options'
    import { pathStorage } from '~/store/paths'
    import { topicStore } from '~/store/topicStore'

    const paths = await pathStorage()
    const topics = await topicStore()

    async function onAddTopic (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const topic = data.get('topic')

        event.preventDefault()
        topics.add(topic)
        form.reset()
        debug('Add topic:', {topic})
    }

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

    <form onsubmit={onAddTopic}>
        <label>
            Add a topic:
            <input name="topic" type="text">
        </label>
    </form>

    {#each $topics as topic (topic)}
        <KeywordList path={topic}></KeywordList>
    {/each}

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
