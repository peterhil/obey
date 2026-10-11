<script>
    import { debug } from '~/lib/debug'

    let { path, word } = $props()

    function remove (word, path) {
        debug('Remove:', {word, path})
    }
</script>

<li>
    {word}
    <span class="remove" onclick={() => remove(word, path)}>&times;</span>
</li>
