<script lang="ts">
    export let visible = true;
</script>

{#if visible}
    <div id="wrapper">
        LSB

        <button on:click={() => (visible = !visible)}>Toggle me!</button>
    </div>
{/if}

<style lang="scss">
    #wrapper {
        display: flex;
        flex-shrink: 0;
        align-items: start; // Prevents children from stretching

        width: 17.5rem;

        background-color: red;
    }
</style>
