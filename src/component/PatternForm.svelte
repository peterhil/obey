<script>
    import { debug } from '~/lib/debug'
    import { cleanKeywords } from '~/lib/keywords'
    import { topLevelDomain } from '~/lib/utils'

    import { topics } from '~/store/topicStore'

    const { patterns } = $props()

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)

        const keywords = data.getAll('keywords')
        const pattern = data.get('pattern')

        const urlPattern = {hostname: pattern}
        const domain = topLevelDomain(pattern)

        patterns.add(urlPattern, keywords)

        event.preventDefault()
        form.reset()
        debug('Add pattern:', {domain, urlPattern})
    }
</script>

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
