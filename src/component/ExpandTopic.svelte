<script>
    import Keyword from '~/component/Keyword.svelte'

    import { patterns } from '~/store/patterns'
    import { topics } from '~/store/topics'

    const { id, patternId } = $props()

    const topic = $derived(topics.get(id))

    function removeTopic (event) {
        event.preventDefault()
        patterns.removeTopic(patternId, id)
    }
</script>

<details class="keywords">
    <summary>
        {topic.name}
        <button
            class="remove"
            onclick={removeTopic}
            type="button"
            >
            &times;
        </button>
    </summary>
    {#each $topics.get(id).hide as word (word)}
        <Keyword {word} onremove={() => topics.removeWord(id, word)} />
    {/each}
</details>
