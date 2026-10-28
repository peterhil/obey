<script>
    import { toASCII, toUnicode } from 'punycode'

    import PatternField from '~/component/PatternField.svelte'

    import { debug } from '~/lib/debug'
    import { cleanPattern, patternToInput } from '~/lib/pattern'
    import { pattern } from '~/store/pattern'

    let input = $state('')
    let up = $state(null)

    function onfieldinput (event) {
        input = patternToInput($pattern)
        if (event.target !== document.activeElement) {
            oninput()
        }
    }

    function onhostnameblur () {
        $pattern.hostname = toASCII($pattern.hostname)
        debug('hostname blur:', $pattern.hostname)
    }

    function onhostnamefocus () {
        $pattern.hostname = toUnicode($pattern.hostname)
        debug('hostname focus:', $pattern.hostname)
    }

    function oninput () {
        const url = input.match('://') ? input : '*://' + input

        try {
            up = new URLPattern(url, {ignoreCase: true})
            $pattern = cleanPattern(up)
            debug('UrlPattern change:', input, up, $pattern)
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
            Add an <a href="https://developer.mozilla.org/en-US/docs/Web/API/URLPattern/URLPattern"
            target="_blank">URL pattern</a>:
            <input
                bind:value={input}
                class:error={up === null}
                {oninput}
                name="input"
                type="text"
                >
            <p>
                <small>Note: Use asterisk like *example.com to match all subdomain levels.</small>
            </p>
        </label>
    </summary>

    {#if up}
        <div class="pattern-fields">
            <PatternField
                bind:pattern={$pattern}
                field={'protocol'}
                label='Protocol:'
                oninput={onfieldinput}
                />
            <PatternField
                bind:pattern={$pattern}
                field={'hostname'}
                label='Hostname:'
                onblur={onhostnameblur}
                onfocus={onhostnamefocus}
                oninput={onfieldinput}
                />
            <PatternField
                bind:pattern={$pattern}
                field={'port'}
                label='Port:'
                oninput={onfieldinput}
                />
            <PatternField
                bind:pattern={$pattern}
                field={'pathname'}
                label='Pathname:'
                oninput={onfieldinput}
                />
            <PatternField
                bind:pattern={$pattern}
                field={'search'}
                label='Search:'
                oninput={onfieldinput}
                />
            <PatternField
                bind:pattern={$pattern}
                field={'hash'}
                label='Hash:'
                oninput={onfieldinput}
                />
        </div>
    {/if}
</details>
