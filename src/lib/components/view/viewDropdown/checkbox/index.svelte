<script lang="ts">
    export let checked = true;
</script>

<div id="wrapper">
    <button id="checkbox" on:click={() => (checked = !checked)}>
        {#if checked}
            <img src="/icons/checkmark.svg" alt="checkmark" />
        {/if}
    </button>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 0.625rem;
        height: 0.625rem;
        flex-shrink: 0;

        border-radius: 0.125rem;
        border: 1px solid $primary-grey;

        #checkbox {
            display: flex;
            justify-content: center;
            align-items: center;

            width: 0.625rem;
            height: 0.625rem;

            background: transparent;
            border: none;

            img {
                width: 0.625rem;
                height: 0.625rem;
            }
        }
    }
</style>
