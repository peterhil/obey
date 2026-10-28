<script>
    import Patterns from '~/component/Patterns.svelte'
    import Topics from '~/component/Topics.svelte'

    import { patterns } from '~/store/patterns'
    import { topics } from '~/store/topics'
</script>

<div>
    <h1>Obey options</h1>
    <h2>Keywords to hide</h2>

    <Topics {topics}></Topics>

    <h2>URL patterns</h2>

    <Patterns {patterns}></Patterns>
</div>
