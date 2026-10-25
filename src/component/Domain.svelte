<script>
    const { domain, onremove } = $props()
</script>

<article class="domain">
    {#if domain !== '*'}
        <button
            aria-label="Delete"
            class="delete"
            onclick={onremove}
            type="button"
            >
            &times;
        </button>
    {/if}
    <h3>{domain === '*' ? 'Everywhere' : domain}</h3>

    <ul class="rules">
    </ul>
</article>
