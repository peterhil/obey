<script>
    import Keyword from '~/component/Keyword.svelte'

    import { topics } from '~/store/topics'

    const { id } = $props()

    const topic = $derived(topics.get(id))
</script>

<details class="keywords">
    <summary>{topic.name}</summary>
    {#each $topics.get(id).hide as word (word)}
        <Keyword {word} onremove={() => topics.removeWord(id, word)} />
    {/each}
</details>
