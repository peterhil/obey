<script>
    import { debug } from '~/lib/debug'
    import { cleanKeywords } from '~/lib/keywords'

    import UrlPattern from '~/component/UrlPattern.svelte'

    import { pattern } from '~/store/pattern'
    // import { patterns } from '~/store/patterns'
    import { topics } from '~/store/topics'

    let { patterns } = $props()

    let form
    let keywords = []

    async function onsubmit (event) {
        patterns.add($pattern, keywords)
        debug('Add pattern:', $pattern)

        form.reset()
        event.preventDefault()

        return true
    }
</script>

<form bind:this={form} {onsubmit} class="pattern-form">
    <UrlPattern />
    <label>
        Keyword topics:
        <select
            bind:value={keywords}
            name="keywords"
            multiple
            size="3"
            >
            {#each [...$topics.entries()] as [id, topic] (id)}
                <option value={id}>
                    {topic.name}: {cleanKeywords(topic.hide)}
                </option>
            {/each}
        </select>
    </label>
    <button type="submit">Add</button>
</form>
