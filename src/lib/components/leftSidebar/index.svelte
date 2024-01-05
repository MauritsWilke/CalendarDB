<script lang="ts">
    import Header from "./header/index.svelte";

    export let visible = true;
</script>

{#if visible}
    <div id="wrapper">
        <Header></Header>
    </div>
{/if}

<style lang="scss">
    #wrapper {
        // # Layout
        display: flex;
        flex-shrink: 0;
        align-items: start; // Prevents children from stretching

        width: 17.5rem;

        // # Styling
        border-right: 2px solid $border;
        background: $off-white;
    }
</style>
