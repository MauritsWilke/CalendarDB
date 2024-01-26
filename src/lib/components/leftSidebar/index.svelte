<script lang="ts">
    import Header from "./header/index.svelte";
    import Divider from "../divider/index.svelte";
    import MiniCalendar from "./miniCalendar/index.svelte";

    export let visible = true;
</script>

{#if visible}
    <div id="wrapper">
        <Header />
        <Divider />
        <div id="MiniCalendar">
            <MiniCalendar></MiniCalendar>
        </div>
    </div>
{/if}

<style lang="scss">
    #wrapper {
        // # Layout
        display: flex;
        flex-shrink: 0;
        align-items: center; // Prevents children from stretching
        flex-direction: column;

        width: 17.5rem;

        // # Styling
        border-right: 2px solid $border;
        background: $off-white;

        #MiniCalendar {
            padding: 1rem;
        }
    }
</style>
