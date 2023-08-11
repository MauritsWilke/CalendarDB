<script lang="ts">
    import { currentUser } from "$lib/scripts/stores";
    import { auth } from "$lib/scripts/firebase";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
    import { redirect } from "@sveltejs/kit";

    let lastAction: string = "None";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        lastAction = "signInWithGoogle";
    }

    async function _signOut() {
        signOut(auth);
        lastAction = "_signOut";
    }

    $: prettyInfo = JSON.stringify($currentUser, null, `\t`);
</script>

<svelte:head>
    <title>Login | CalendarDB</title>
    <meta name="description" content="Log in to CalendarDB" />

    <meta property="og:title" content="Login | CalendarDB" />
    <meta property="og:type" content="website" />
    <meta property="og:description" content="Log in to CalendarDB" />
    <meta property="og:site_name" content="CalendarDB" />
</svelte:head>

<h2>Last action: {lastAction}</h2>

<button on:click={signInWithGoogle}> Sign in with Google </button>
<button on:click={_signOut}> Sign out </button>

<pre>{prettyInfo}</pre>

<style lang="scss">
    pre {
        width: 90vw;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
</style>
