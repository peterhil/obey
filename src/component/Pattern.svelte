<script>
    import ExpandTopic from '~/component/ExpandTopic.svelte'
    import PatternTopicForm from '~/component/PatternTopicForm.svelte'

    import { cleanPattern, patternToInput } from '~/lib/pattern'
    import { topics } from '~/store/topics'

    const { id, onremove, pattern } = $props()

    const input = $derived(patternToInput(pattern.up))
</script>

<article class="pattern">
    <button
        aria-label="Delete"
        class="delete"
        onclick={onremove}
        type="button"
        >
        &times;
    </button>
    <h3>{input === '*' ? 'Everywhere' : input}</h3>

    <ul class="rules">
        {#each pattern.kw as kwid}
            <li>
                <ExpandTopic id={kwid} patternId={id} />
            </li>
        {/each}
    </ul>

    <PatternTopicForm {id} {pattern} />
</article>
