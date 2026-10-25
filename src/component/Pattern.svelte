<script>
    import { filter, isEmpty, switcher } from 'rambdax'

    import Keyword from '~/component/Keyword.svelte'
    import { debug } from '~/lib/debug'
    import { wordStorage } from '~/store/words'

    const { pattern } = $props()

    const words = await wordStorage(pattern)

    function onDelete () {
        if (confirm('Are you sure?')) {
            debug('Would delete:', pattern)
            // patterns.remove(pattern)
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

        words.add(boundedWord)

        debug('onsubmit', {event, data, boundedWord})
        event.preventDefault()
        form.reset()

        return true
    }
</script>

<article class="pattern">
    {#if pattern !== '*'}
        <button
            aria-label="Delete"
            class="delete"
            onclick={onDelete}
            type="button"
            >
            &times;
        </button>
    {/if}
    <h3>{pattern === '*' ? 'Everywhere' : pattern}</h3>

    <ul class="keywords">
        {#each $words as word (word)}
            <Keyword {word} {words} />
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
                <select
                    class="boundary"
                    name="boundary"
                    aria-label="Select word boundary"
                    title="Word boundary"
                    required
                    >
                    <option value="start">Start</option>
                    <option value="both" selected>Word</option>
                    <option value="end">End</option>
                    <option value="none">Regex</option>false
                </select>
                <button class="add">Add</button>
            </div>
        </form>
    </footer>
</article>
