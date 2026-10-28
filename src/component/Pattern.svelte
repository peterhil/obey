<script>
    import ExpandTopic from '~/component/ExpandTopic.svelte'
    import { cleanPattern, patternToInput } from '~/lib/pattern'

    const { onremove, pattern } = $props()
    const input = $derived(patternToInput(pattern.up))
</script>

<article class="domain">
    {#if input !== '*'}
        <button
            aria-label="Delete"
            class="delete"
            onclick={onremove}
            type="button"
            >
            &times;
        </button>
    {/if}
    <h3>{input === '*' ? 'Everywhere' : input}</h3>

    <ul class="rules">
        {#each pattern.kw as id}
            <li>
                <ExpandTopic {id} />
            </li>
        {/each}
    </ul>
</article>
