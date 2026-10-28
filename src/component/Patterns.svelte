<script>
    import Domain from '~/component/Domain.svelte'
    import PatternForm from '~/component/PatternForm.svelte'

    let { patterns } = $props()

    function onremove (id) {
        if (confirm('Are you sure?')) {
            patterns.remove(id)
        }
    }
</script>

<section class="domains">
    <PatternForm {patterns} />

    {#each $patterns as [id, pattern] (id)}
        <Domain
            {pattern}
            onremove={() => onremove(id)}
            >
        </Domain>
    {:else}
        No patterns!
    {/each}
</section>
