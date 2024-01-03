<script lang="ts">
    import { goto } from "$app/navigation";
    import { user } from "$lib/firebase";
</script>

{#if $user}
    <slot />
{:else}
    log in scruffy
    <button on:click={() => goto("/signin")}>Fine 😔</button>
{/if}
