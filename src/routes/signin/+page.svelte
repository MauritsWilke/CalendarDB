<script lang="ts">
    import { goto } from "$app/navigation";
    import { signInWithGoogle } from "scripts/firebase/auth/signInWithGoogle";
    import { signInWithEmailAndPassword } from "scripts/firebase/auth/signInWithEmailAndPassword";

    async function _signInWithGoogle() {
        await signInWithGoogle();
        goto("/");
    }

    let email: string;
    let password: string;
    async function _signInWithEmailAndPassword() {
        await signInWithEmailAndPassword(email, password);
        // TODO handle invalid log in 😅
        goto("/");
    }
</script>

<button on:click={_signInWithGoogle}>Sign in</button>

<form>
    <input type="text" placeholder="name@email.com" bind:value={email} />
    <input type="password" placeholder="password" bind:value={password} />
    <button on:click|preventDefault={_signInWithEmailAndPassword}>Sign in</button>
</form>
