<script>
    import ExpandTopic from '~/component/ExpandTopic.svelte'

    const { domain, pattern, topics, onremove } = $props()
</script>

<article class="domain">
    {#if domain !== '*'}
        <button
            aria-label="Delete"
            class="delete"
            onclick={onremove}
            type="button"
            >
            &times;
        </button>
    {/if}
    <h3>{domain === '*' ? 'Everywhere' : domain}</h3>

    <ul class="rules">
        {#each pattern.kw as kwid}
            <li>
                <ExpandTopic id={kwid} topic={topics.get(kwid)} {topics} />
            </li>
        {/each}
    </ul>
</article>
