<script>
    import { filter } from 'rambdax'

    import { debug } from '~/lib/debug'

    let { path, word, words } = $props()

    function remove () {
        const filtered = filter((item) => item !== word, $words)

        $words = filtered
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
