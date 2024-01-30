<script lang="ts">
    import LeftSidebar from "components/leftSidebar/index.svelte";
    import RightSidebar from "components/rightSidebar/index.svelte";
    import View from "components/view/index.svelte";
    import Head from "components/head/index.svelte";
</script>

<Head title={"App | CalendarDB"} description={"CalendarDB homepage"} />

<div id="wrapper">
    <LeftSidebar />
    <View />
    <RightSidebar />
</div>

<style lang="scss">
    #wrapper {
        width: 100vw;
        height: 100vh;

        display: flex;
        flex-direction: row;
    }
</style>
