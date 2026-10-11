<script>
    import { filter } from 'rambdax'

    import { debug } from '~/lib/debug'
    import { words } from '~/store/words'

    let { path, word } = $props()

    function remove () {
        const filtered = filter((item) => item !== word, $words[path])

        debug('KeywordList remove:', {words: $words[path], filtered})
        $words[path] = filtered
    }
</script>

<li>
    {word}
    <button
        class="remove"
        onclick={remove}
        type="button"
        >
        &times;
    </button>
</li>
