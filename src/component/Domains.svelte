<script>
    import Domain from '~/component/Domain.svelte'
    import PatternForm from '~/component/PatternForm.svelte'

    import { topics } from '~/store/topicStore'

    const { patterns } = $props()

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
            domain={pattern.up.hostname}
            onremove={() => onremove(id)}
            {pattern}
            {topics}
            >
        </Domain>
    {/each}
</section>
