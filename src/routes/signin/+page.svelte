<script lang="ts">
    import { currentUser } from "$lib/scripts/stores";
    import { auth } from "$lib/scripts/firebase";
    import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { redirect } from "@sveltejs/kit";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        throw redirect(307, "/");
    }
</script>

<svelte:head>
    <title>Login | CalendarDB</title>
    <meta name="description" content="Log in to CalendarDB" />

    <meta property="og:title" content="Login | CalendarDB" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Log in to CalendarDB" />
    <meta property="og:site_name" content="CalendarDB" />
</svelte:head>

{#if $currentUser}
    <p>Redirecting you...</p>
{:else}
    <button on:click={signInWithGoogle}> Sign in with Google </button>
{/if}

<style lang="scss">
</style>
