<script>
    import { debug } from '~/lib/debug'

    let { isPaused } = await browser.storage.sync.get({isPaused: false})
    let state = $state({isPaused})

    function openOptionsPage () {
        browser.runtime.openOptionsPage()
        window.close()

        return false
    }

    async function togglePause () {
        let { isPaused } = await browser.storage.sync.get({isPaused: false})

        state.isPaused = !isPaused
        await browser.storage.sync.set({isPaused: state.isPaused})
        debug('togglePause:', {isPaused: state.isPaused})

        return false
    }
</script>

<main>
    <h1>Obey – hide content!</h1>

    <div class="card">
        <button type="button" on:click={openOptionsPage}>
            Options
        </button>

        <button type="button" on:click={togglePause}>
            {state.isPaused ? 'Enable' : 'Disable'}
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
