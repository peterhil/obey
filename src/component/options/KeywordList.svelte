<script>
    import Keyword from '$lib/component/options/Keyword.svelte'

    const { domain, rules} = $props()
</script>

<section class="domain">
    <h3>{domain === '*' ? 'All domains' : domain}</h3>

    <ul>
        {#each rules[domain] as word}
            <Keyword {word} {domain} />
        {/each}
    </ul>

    <div class="input-group">
        <input type="text" placeholder="Keyword" />
        <button type="button">Add</button>
    </div>
</section>
