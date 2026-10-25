<script>
    import Patterns from '~/component/Patterns.svelte'
    import Topics from '~/component/Topics.svelte'

    import { pathStorage } from '~/store/paths'
    import { topics } from '~/store/topicStore'

    const paths = await pathStorage()
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    <Topics {topics}></Topics>

    <h2>URL patterns</h2>

    <Patterns {paths}></Patterns>
</div>
