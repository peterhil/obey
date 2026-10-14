<script>
    import { prepend } from 'rambdax'

    import Keyword from '~/component/options/Keyword.svelte'
    import { debug } from '~/lib/debug'
    import { iSort, iUniq } from '~/lib/utils'
    import { wordStorage } from '~/store/words'

    const { path, rules} = $props()
    const words = await wordStorage(path)

    let newWord = ''

    function add (newWord, path) {
        const list = $words?.length > 0 ? prepend(newWord, $words) : [newWord]
        const sorted = iSort(iUniq(list))

        $words = sorted
    }
</script>

<article class="path">
    <h3>{path === '*' ? 'Everywhere' : path}</h3>

    <ul>
        {#each $words as word (word)}
            <Keyword {word} {path} {words} />
        {/each}
    </ul>

    <footer>
        <form>
            <div role="group">
                <input
                    bind:value={newWord}
                    placeholder="Keyword"
                    type="text"
                    />
                <button onclick={() => add(newWord, path)}>Add</button>
            </div>
        </form>
    </footer>
</article>
