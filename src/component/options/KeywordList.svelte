<script>
    import Keyword from '~/component/options/Keyword.svelte'

    const { path, rules} = $props()
</script>

<section class="path">
    <h3>{path === '*' ? 'Everywhere' : path}</h3>

    <ul>
        {#each rules[path] as word}
            <Keyword {word} {path} />
        {/each}
    </ul>

    <div class="input-group">
        <input type="text" placeholder="Keyword" />
        <button type="button">Add</button>
    </div>
</section>
