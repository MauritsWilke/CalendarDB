<script lang="ts">
    import { currentUser } from "$lib/stores/authStore";
</script>

{#if $currentUser}
    <slot />
{:else}
    <p>Not logged in</p>
    <a href="/signin">Sign in page</a>
{/if}

<style lang="scss">
    :global(*) {
        padding: 0px;
        margin: 0px;
    }
</style>
