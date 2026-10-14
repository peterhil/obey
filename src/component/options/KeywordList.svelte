<script>
    import { isEmpty, prepend, switcher } from 'rambdax'

    import Keyword from '~/component/options/Keyword.svelte'
    import { debug } from '~/lib/debug'
    import { iSort, iUniq } from '~/lib/utils'
    import { wordStorage } from '~/store/words'

    const { path, rules} = $props()
    const words = await wordStorage(path)

    let newWord = ''

    function add (newWord, path) {
        if ($words?.length >= 1) {
            const list = prepend(newWord, $words)
            const sorted = iSort(iUniq(list))

            $words = sorted
        }
        else {
            $words = [newWord]
        }
    }

    function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)

        const word = data.get('word')
        const boundary = data.get('boundary')

        if (isEmpty(word)) return false

        const boundedWord = switcher(boundary)
              .is('start', '\\b' + word)
              .is('both', '\\b' + word + '\\b')
              .is('end', word + '\\b')
              .default(word)

        event.preventDefault()
        add(boundedWord, path)
        debug('onsubmit', {event, data, boundedWord})
        form.reset()

        return true
    }
</script>

<article class="path">
    <h3>{path === '*' ? 'Everywhere' : path}</h3>

    <ul class="keywords">
        {#each $words as word (word)}
            <Keyword {word} {path} {words} />
        {/each}
    </ul>

    <footer>
        <form {onsubmit}>
            <div role="group">
                <input
                    minlength="1"
                    name="word"
                    placeholder="Keyword"
                    required
                    type="text"
                    />
                <label>
                    <input type="radio" name="boundary" value="start" />
                    Start
                </label>
                <label>
                    <input type="radio" name="boundary" value="both" checked />
                    Word
                </label>
                <label>
                    <input type="radio" name="boundary" value="end" />
                    End
                </label>
                <label>
                    <input type="radio" name="boundary" value="none" />
                    None
                </label>
                <button>Add</button>
            </div>
        </form>
    </footer>
</article>
