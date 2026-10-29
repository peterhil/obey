<script>
    import { debug } from '~/lib/debug'

    let { disabled } = await browser.storage.sync.get({disabled: false})
    let state = $state({disabled})

    function openOptionsPage () {
        browser.runtime.openOptionsPage()
        window.close()

        return false
    }

    async function toggleDisabled () {
        let { disabled } = await browser.storage.sync.get({disabled: false})

        state.disabled = !disabled
        await browser.storage.sync.set({disabled: state.disabled})
        debug('toggleDisabled:', {disabled: state.disabled})

        return false
    }
</script>

<main>
    <h1>Obey – hide content!</h1>

    <div class="card">
        <button type="button" on:click={openOptionsPage}>
            Options
        </button>

        <button type="button" on:click={toggleDisabled}>
            {state.disabled ? 'Enable' : 'Disable'}
        </button>
    </div>

    <p class="help">
        Source code and instructions on
        <a href="https://github.com/peterhil/obey/"
           target="_blank" rel="noreferrer">
            Github
        </a>
    </p>
</main>

<style>
    .help {
        color: #888;
    }
</style>
