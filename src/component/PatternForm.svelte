<script>
    import { debug } from '~/lib/debug'
    import { cleanKeywords } from '~/lib/keywords'

    // import { patterns } from '~/store/patternStore'
    import { topics } from '~/store/topicStore'

    let { patterns } = $props()

    let form
    let keywords = []
    let pattern = ''

    async function onsubmit (event) {
        const urlPattern = {hostname: pattern}

        event.preventDefault()
        patterns.add(urlPattern, keywords)
        debug('Add pattern:', urlPattern)
        form.reset()

        return true
    }
</script>

<form bind:this={form} {onsubmit}>
    <label>
        Add domain or pattern:
        <input bind:value={pattern} name="pattern" type="text">
    </label>
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
