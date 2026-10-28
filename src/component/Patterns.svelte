<script>
    import Pattern from '~/component/Pattern.svelte'
    import PatternForm from '~/component/PatternForm.svelte'

    let { patterns } = $props()

    function onremove (id) {
        if (confirm('Are you sure?')) {
            patterns.remove(id)
        }
    }
</script>

<section class="patterns">
    <PatternForm {patterns} />

    {#each $patterns as [id, pattern] (id)}
        <Pattern
            {pattern}
            onremove={() => onremove(id)}
            >
        </Pattern>
    {:else}
        No patterns!
    {/each}
</section>
