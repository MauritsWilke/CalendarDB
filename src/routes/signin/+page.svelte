<script lang="ts">
    import { goto } from "$app/navigation";
    import { auth } from "$lib/firebase";
    import { currentUser } from "$lib/stores/authStore";
    import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

    async function signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider);
        goto("/");
    }

    async function _signOut() {
        await signOut(auth);
    }
</script>

{#if $currentUser}
    <button on:click={_signOut}>Sign out</button>
{:else}
    <button on:click={signInWithGoogle}>Sign in</button>
{/if}
