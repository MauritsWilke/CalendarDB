<script lang="ts">
    import { _signOut } from "scripts/firebase/auth/signOut";
</script>

<h1>Are ya logged in laddy? 🦜</h1>
<button on:click={_signOut}>Sign out</button>
