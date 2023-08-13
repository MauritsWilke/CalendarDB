<script lang="ts">
    import LogoHeader from "$lib/components/LogoHeader/index.svelte";
    import Divider from "$lib/components/Divider/index.svelte";
</script>

<div id="wrapper">
    <div id="header">
        <LogoHeader />
    </div>
    <Divider />
</div>

<style lang="scss">
    #wrapper {
        width: 17.5rem;
        height: 100vh;
        flex-shrink: 0;

        #header {
            display: flex;
            width: 100%;
            box-sizing: border-box;
            height: 4.6875rem;
            padding: 0.875rem 0.9375rem;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 0.5rem;
            flex-shrink: 0;
        }
    }
</style>
