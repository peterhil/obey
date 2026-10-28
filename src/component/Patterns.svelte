<script>
    import Pattern from '~/component/Pattern.svelte'
    import PatternForm from '~/component/PatternForm.svelte'

    import { debug } from '~/lib/debug'
    import { patterns, sortedPatterns } from '~/store/patterns'

    function onremove (id) {
        if (confirm('Are you sure?')) {
            patterns.remove(id)
        }
    }
</script>

<section class="patterns">
    <PatternForm {patterns} />

    {#each [...$sortedPatterns.entries()] as [id, pattern] (id)}
        <Pattern
            pattern={$patterns.get(id)}
            onremove={() => onremove(id)}
            >
        </Pattern>
    {:else}
        No patterns!
    {/each}
</section>
