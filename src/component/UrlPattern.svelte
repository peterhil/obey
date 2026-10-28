<script>
    import { toASCII, toUnicode } from 'punycode'
    import { filter, filterIndexed, identity, includes, join, pick } from 'rambdax'

    import PatternField from '~/component/PatternField.svelte'

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

    function maybe(field, obj) {
        return obj[field] ? obj[field] : ''
    }

    function maybePrefix(field, prefix, obj) {
        return obj[field] ? prefix + obj[field] : ''
    }

    function maybeSuffix(field, suffix, obj) {
        return obj[field] ? obj[field] + suffix : ''
    }

    function patternToInput (p) {
        const protocol = maybeSuffix('protocol', '://', p)
        const host = join(':', filter(identity, [p.hostname, p.port]))
        const pathname = maybe('pathname', p)
        const search = maybePrefix('search', '?', p)
        const hash = maybePrefix('hash', '#', p)

        return join('', [
            protocol,
            host,
            pathname,
            search,
            hash,
        ])
    }

    function onfieldinput (event) {
        input = patternToInput(pattern)
        if (event.target !== document.activeElement) {
            oninput()
        }
    }

    function onhostnameblur () {
        pattern.hostname = toASCII(pattern.hostname)
    }

    function onhostnamefocus () {
        pattern.hostname = toUnicode(pattern.hostname)
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
            <PatternField
                {pattern}
                field={'protocol'}
                label='Protocol:'
                oninput={onfieldinput}
                />
            <PatternField
                {pattern}
                field={'hostname'}
                label='Hostname:'
                onblur={onhostnameblur}
                onfocus={onhostnamefocus}
                oninput={onfieldinput}
                />
            <PatternField
                {pattern}
                field={'port'}
                label='Port:'
                oninput={onfieldinput}
                />
            <PatternField
                {pattern}
                field={'pathname'}
                label='Pathname:'
                oninput={onfieldinput}
                />
            <PatternField
                {pattern}
                field={'search'}
                label='Search:'
                oninput={onfieldinput}
                />
            <PatternField
                {pattern}
                field={'hash'}
                label='Hash:'
                oninput={onfieldinput}
                />
        </div>
    {/if}
</details>
