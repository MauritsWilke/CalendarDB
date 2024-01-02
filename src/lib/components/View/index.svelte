<script lang="ts">
    import { Calendar } from "$lib/scripts/Calendar";
    const Cal = new Calendar();

    import Monthly from "$lib/components/View/Month/index.svelte";

    type Views = "monthly" | "daily" | "weekly" | "table";
    export let view: Views = "monthly";
    export let weekends = true;
</script>

<div id="wrapper">
    <Monthly />
</div>

<style lang="scss">
    #wrapper {
        flex: 1;

        margin-right: 1rem; // ! REMOVE
        // background-color: red;
    }
</style>
