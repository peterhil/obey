<script>
    import { debug } from '~/lib/debug'

    let { path, remove, word } = $props()
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
