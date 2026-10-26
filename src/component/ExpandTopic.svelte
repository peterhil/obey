<script>
    import Keyword from '~/component/Keyword.svelte'

    const { id, topic, topics } = $props()
    const keywords = $derived(topic.hide)
</script>

<details class="keywords">
    <summary>{topic.name}</summary>
    {#each keywords as word (word)}
        <Keyword {word} onremove={() => topics.removeWord(id, word)} />
    {/each}
</details>
