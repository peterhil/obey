<script>
    import { keys } from 'rambdax'

    import KeywordList from '~/component/options/KeywordList.svelte'
    import { options } from '~/lib/options'
    // import { domains } from '~/store/domains'

    const rules = options.rules
    const domains = keys(rules)
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    {#each domains as domain}
        <KeywordList {domain} {rules}></KeywordList>
    {/each}
</div>
