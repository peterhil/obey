<script>
    import TopicKeywords from '~/component/TopicKeywords.svelte'
    import { debug } from '~/lib/debug'

    const { topics } = $props()

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const topic = data.get('topic')

        event.preventDefault()

        topics.add(topic)
        form.reset()
        debug('Add topic:', {topic})
    }
</script>

<section class="topics">
    <form {onsubmit}>
        <label>
            Add a topic:
            <input name="topic" type="text">
        </label>
    </form>

    {#each [...$topics.entries()] as [id, topic] (id)}
        <TopicKeywords {id} {topic}></TopicKeywords>
    {/each}
</section>
