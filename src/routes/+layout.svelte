<script lang="ts">
    import { currentUser } from "$lib/scripts/stores";
    import { redirect } from "@sveltejs/kit";
    import { page } from "$app/stores";

    if (!currentUser && $page.route.id !== "/signin") {
        throw redirect(307, "/singin");
    }
</script>

<slot />
