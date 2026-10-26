<script>
    import { isEmpty, switcher } from 'rambdax'

    import Keyword from '~/component/Keyword.svelte'
    import { topics } from '~/store/topicStore'

    const { id, topic } = $props()
    let input

    function addWord (word, boundary = 'both') {
        if (isEmpty(word)) return false

        const boundedWord = switcher(boundary)
              .is('start', '\\b' + word)
              .is('both', '\\b' + word + '\\b')
              .is('end', word + '\\b')
              .default(word)

        topics.addWord(id, boundedWord)
    }

    function removeWord (word) {
        topics.removeWord(id, word)
    }

    function ondelete () {
        if (confirm('Are you sure?')) {
            topics.remove(id)
        }
    }

    function onsubmit (event) {
        const form = event.currentTarget
        const data = new FormData(form)
        const word = data.get('word')
        const boundary = data.get('boundary')

        addWord(word, boundary)
        event.preventDefault()
        form.reset()
        input.focus()

        return true
    }
</script>

<article class="topic">
    {#if topic.name !== '*'}
        <button
            aria-label="Delete"
            class="delete"
            onclick={ondelete}
            type="button"
            >
            &times;
        </button>
    {/if}
    <h3>{topic.name === '*' ? 'Everywhere' : topic.name}</h3>

    <ul class="keywords">
        {#each topic.hide as word (word)}
            <Keyword {word} onremove={() => removeWord(word)} />
        {/each}
    </ul>

    <footer>
        <form {onsubmit}>
            <div role="group">
                <input
                    bind:this={input}
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
