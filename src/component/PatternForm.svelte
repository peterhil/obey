<script>
    import { debug } from '~/lib/debug'
    import { cleanKeywords } from '~/lib/keywords'

    import UrlPattern from '~/component/UrlPattern.svelte'

    // import { patterns } from '~/store/patternStore'
    import { topics } from '~/store/topicStore'

    let { patterns } = $props()

    let form
    let keywords = []
    let pattern = ''

    async function onsubmit (event) {
        event.preventDefault()
        patterns.add(pattern, keywords)
        debug('Add pattern:', pattern)
        form.reset()

        return true
    }
</script>

<form bind:this={form} {onsubmit}>
    <UrlPattern bind:value={pattern} />
    <label>
        Keyword topics:
        <select
            bind:value={keywords}
            name="keywords"
            multiple
            size="3"
            >
            {#each [...$topics.entries()] as [id, topic] (id)}
                <option value={id}>{topic.name}: {cleanKeywords(topic.hide)}</option>
            {/each}
        </select>
    </label>
</form>
