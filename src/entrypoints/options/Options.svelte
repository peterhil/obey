<script>
    import { keys } from 'rambdax'

    import KeywordList from '~/component/KeywordList.svelte'
    import { options } from '~/lib/options'
    // import { paths } from '~/store/paths'

    const rules = options.rules
    const paths = keys(rules)
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    {#each paths as path}
        <KeywordList {path} {rules}></KeywordList>
    {/each}
</div>
