<script>
    import { filter } from 'rambdax'

    import { debug } from '~/lib/debug'

    let { word, onremove } = $props()
</script>

<li>
    {word.replaceAll(/\\b/g, '•')}
    <button
        class="remove"
        onclick={onremove}
        type="button"
        >
        &times;
    </button>
</li>
