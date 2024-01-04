<script lang="ts">
    import { signOut } from "scripts/firebase/auth";
</script>

<h1>Are ya logged in laddy? 🦜</h1>
<button on:click={signOut}>Sign out</button>
