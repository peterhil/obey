<script>
    import { includes } from 'rambdax'

    import { debug } from '~/lib/debug'
    import { cleanKeywords } from '~/lib/keywords'

    import { patterns } from '~/store/patterns'
    import { topics } from '~/store/topics'

    let { id, pattern } = $props()

    let form
    let topicId

    async function onsubmit (event) {
        const pattern = $patterns.get(id)
        patterns.addKeyword(id, topicId)
        debug('Add topic to pattern:', pattern)

        form.reset()
        event.preventDefault()

        return true
    }
</script>

<form bind:this={form} {onsubmit} class="pattern-topic-form">
    <label>
        Add keyword topic:
        <select
            bind:value={topicId}
            name="topic"
            >
            {#each [...$topics.entries()] as [id, topic] (id)}
                {#if !includes(id, pattern.kw)}
                    <option value={id}>
                        {topic.name}: {cleanKeywords(topic.hide)}
                    </option>
                {/if}
            {/each}
        </select>
    </label>
    <button type="submit">Add topic</button>
</form>
