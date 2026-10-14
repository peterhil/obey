<script>
    import { prepend, sort } from 'rambdax'
    import { onMount } from 'svelte'

    import KeywordList from '~/component/KeywordList.svelte'
    import { debug } from '~/lib/debug'
    // import { defaultRules } from '~/lib/options'
    import { paths } from '~/store/paths'
    import { wordStorage } from '~/store/words'

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const path = data.get('path')
        const sorted = prepend(path, $paths).toSorted()

        event.preventDefault()

        // Create new storage key
        await browser.storage.sync.set({[path]: []})
        $paths = sorted

        debug('Add path:', {path})
    }

    onMount(async () => {
        const keys = await browser.storage.sync.getKeys()
        $paths = keys.toSorted()
    })
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    <form {onsubmit}>
        <label>
            Add domain or path:
            <input name="path" type="text">
        </label>
    </form>

    {#each $paths as path (path)}
        <KeywordList {path}></KeywordList>
    {/each}
</div>
