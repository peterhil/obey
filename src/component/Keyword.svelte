<script>
    import { filter } from 'rambdax'

    import { debug } from '~/lib/debug'

    let { word, words } = $props()

    function remove () {
        words.remove(word)
    }
</script>

<li>
    {word.replaceAll(/\\b/g, '•')}
    <button
        class="remove"
        onclick={remove}
        type="button"
        >
        &times;
    </button>
</li>
