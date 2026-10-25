<script>
    import KeywordList from '~/component/KeywordList.svelte'
    import { debug } from '~/lib/debug'

    const { paths } = $props()

    async function onAddPath (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const path = data.get('path')

        event.preventDefault()

        paths.add(path)
        form.reset()
        debug('Add path:', {path})
    }
</script>

<section class="patterns">
    <form onsubmit={onAddPath}>
        <label>
            Add domain or path:
            <input name="path" type="text">
        </label>
    </form>

    {#each $paths as path (path)}
        <KeywordList {path}></KeywordList>
    {/each}
</section>
