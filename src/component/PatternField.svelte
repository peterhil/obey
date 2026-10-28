<script>
    let {
        pattern,
        field = $bindable(),
        label,
        oninput,
    } = $props()
</script>

<label hidden={!pattern[field]}>
    {label}
    <input
        bind:value={pattern[field]}
        {oninput}
        type="text"
        >
</label>
