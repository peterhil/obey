<script>
    import Pattern from '~/component/Pattern.svelte'
    import { debug } from '~/lib/debug'

    const { patterns } = $props()

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const pattern = data.get('pattern')

        event.preventDefault()

        patterns.add(pattern)
        form.reset()
        debug('Add pattern:', {pattern})
    }
</script>

<section class="patterns">
    <form {onsubmit}>
        <label>
            Add domain or pattern:
            <input name="pattern" type="text">
        </label>
    </form>

    {#each $patterns as pattern (pattern)}
        <Pattern {pattern}></Pattern>
    {/each}
</section>
