<script lang="ts">
    import Head from "$lib/components/Head/index.svelte";
    import LeftSidebar from "$lib/components/LeftSidebar/index.svelte";
    import View from "$lib/components/View/index.svelte";
</script>

<Head title={"App | CalendarDB"} description={"CalendarDB homepage"} />

<div id="wrapper">
    <LeftSidebar />

    <View />
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        gap: 1rem;

        height: 100vh;
        overflow: hidden;
    }
</style>
