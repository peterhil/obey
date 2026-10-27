<script>
    import { filter, filterIndexed, includes, pick } from 'rambdax'

    import { debug } from '~/lib/debug'

    const fields = [
        'protocol',
        'hostname',
        'pathname',
        'port',
        'search',
        'hash',
    ]

    let { pattern } = $props()
    let input
    let up = $state(null)

    function oninput (event) {
        const url = input.match('://') ? input : '*://' + input

        try {
            up = new URLPattern(url, {ignoreCase: true})
            pattern = filter(v => v && v !== '*', pick(fields, up))
            debug('UrlPattern change:', input, up, pattern)
        }
        catch (err) {
            up = null
            debug('UrlPattern failed:', up)
        }
    }
</script>

<details class="url-pattern" open>
    <summary>
        <label class="pattern-input">
            Add domain or pattern:
            <input
                bind:value={input}
                class:error={up === null}
                {oninput}
                name="input"
                type="text"
                >
        </label>
    </summary>

    {#if up}
        <div class="pattern-fields">
            <label hidden={!pattern.protocol}>
                Protocol:
                <input bind:value={pattern.protocol} type="text" readonly>
            </label>
            <label hidden={!pattern.hostname}>
                Hostname:
                <input bind:value={pattern.hostname} type="text" readonly>
            </label>
            <label hidden={!pattern.port}>
                Port:
                <input bind:value={pattern.port} type="text" readonly>
            </label>
            <label hidden={!pattern.pathname}>
                Pathname:
                <input bind:value={pattern.pathname} type="text" readonly>
            </label>
            <label hidden={!pattern.search}>
                Searchname:
                <input bind:value={pattern.search} type="text" readonly>
            </label>
            <label hidden={!pattern.hash}>
                Hashname:
                <input bind:value={pattern.hash} type="text" readonly>
            </label>
        </div>
    {/if}
</details>
