<script>
    import Domain from '~/component/Domain.svelte'

    import { debug } from '~/lib/debug'
    import { topLevelDomain } from '~/lib/utils'
    import { topics } from '~/store/topicStore'

    const { patterns } = $props()

    function cleanKeywords (words) {
        return words.join(', ').replace(/\\b/g, '')
    }

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const keywords = data.getAll('keywords')
        const pattern = data.get('pattern')
        const urlPattern = {hostname: pattern}
        const domain = topLevelDomain(pattern)
        event.preventDefault()

        patterns.add(urlPattern, keywords)
        form.reset()
        debug('Add pattern:', {domain, urlPattern})
    }

    function onremove (id) {
        if (confirm('Are you sure?')) {
            patterns.remove(id)
        }
    }
</script>

<section class="domains">
    <form {onsubmit}>
        <label>
            Add domain or pattern:
            <input name="pattern" type="text">
        </label>
        <label>
            Keyword topics:
            <select
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

    {#each $patterns as [id, pattern] (id)}
        <Domain
            domain={pattern.up.hostname}
            onremove={() =>onremove(id)}
            {pattern}
            {topics}
            >
        </Domain>
    {/each}
</section>
