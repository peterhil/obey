<script>
    import { prepend } from 'rambdax'

    import Keyword from '~/component/options/Keyword.svelte'
    import { debug } from '~/lib/debug'
    import { iSort, iUniq } from '~/lib/utils'
    import { words } from '~/store/words'

    const { path, rules} = $props()

    let newWord = ''

    function add (newWord, path) {
        const list = $words[path] ? prepend(newWord, $words[path]) : [newWord]
        const sorted = iSort(iUniq(list))

        $words[path] = sorted
        debug('KeywordList add:', $words[path])
    }
</script>

<section class="path">
    <h3>{path === '*' ? 'Everywhere' : path}</h3>

    <ul>
        {#each $words[path] as word (word)}
            <Keyword {word} {path} {words} />
        {/each}
    </ul>

    <div class="input-group">
        <input
            bind:value={newWord}
            placeholder="Keyword"
            type="text"
            />
        <button onclick={() => add(newWord, path)}>Add</button>
    </div>
</section>
