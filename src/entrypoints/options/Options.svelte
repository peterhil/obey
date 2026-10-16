<script>
    import { prepend, sort } from 'rambdax'
    import { onMount } from 'svelte'

    import KeywordList from '~/component/KeywordList.svelte'
    import { debug } from '~/lib/debug'
    // import { defaultRules } from '~/lib/options'
    import { pathStorage } from '~/store/paths'
    import { wordStorage } from '~/store/words'

    const paths = await pathStorage()

    async function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const path = data.get('path')

        event.preventDefault()

        // Create new storage key
        paths.add(path)
        debug('Add path:', {path})
    }
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
        <KeywordList {path} {paths}></KeywordList>
    {/each}
</div>
