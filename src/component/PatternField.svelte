<script>
    let {
        pattern = $bindable(),
        field,
        label,
        onblur,
        onfocus,
        oninput,
    } = $props()
</script>

<label hidden={!pattern[field]}>
    {label}
    <input
        bind:value={pattern[field]}
        {onblur}
        {onfocus}
        {oninput}
        type="text"
        >
</label>
