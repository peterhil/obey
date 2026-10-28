<script>
    import { filter, filterIndexed, identity, includes, join, pick } from 'rambdax'

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
    let input = $state('')
    let up = $state(null)

    function cleanPattern (up) {
        return filter(v => v && v !== '*', pick(fields, up))
    }

    function patternToInput (p) {
        const protocol = p.protocol ? p.protocol + '://' : ''
        const host = join(':', filter(identity, [p.hostname, p.port]))
        const pathname = p.pathname ? p.pathname : ''
        const search = p.search ? '?' + p.search : ''
        const hash = p.hash ? '#' + p.hash : ''

        return join('', [
            protocol,
            host,
            pathname,
            search,
            hash,
        ])
    }

    function onfieldinput () {
        input = patternToInput(pattern)
        oninput()
    }

    function oninput () {
        const url = input.match('://') ? input : '*://' + input

        try {
            up = new URLPattern(url, {ignoreCase: true})
            pattern = cleanPattern(up)
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
                <input
                    bind:value={pattern.protocol}
                    oninput={onfieldinput}
                    type="text"
                    >
            </label>
            <label hidden={!pattern.hostname}>
                Hostname:
                <input
                    bind:value={pattern.hostname}
                    oninput={onfieldinput}
                    type="text"
                    >
            </label>
            <label hidden={!pattern.port}>
                Port:
                <input
                    bind:value={pattern.port}
                    oninput={onfieldinput}
                    type="text"
                    >
            </label>
            <label hidden={!pattern.pathname}>
                Pathname:
                <input
                    bind:value={pattern.pathname}
                    oninput={onfieldinput}
                    type="text">
            </label>
            <label hidden={!pattern.search}>
                Search:
                <input
                    bind:value={pattern.search}
                    oninput={onfieldinput}
                    type="text"
                    >
            </label>
            <label hidden={!pattern.hash}>
                Hash:
                <input
                    bind:value={pattern.hash}
                    oninput={onfieldinput}
                    type="text"
                    >
            </label>
        </div>
    {/if}
</details>
