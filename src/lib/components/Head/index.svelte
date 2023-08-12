<script lang="ts">
    export let title: string;
    export let description: string;
</script>

<svelte:head>
    <title>{title}</title>
    <meta name="description" content={description} />

    <meta property="og:title" content={title} />
    <meta property="og:type" content="website" />
    <meta property="og:description" content={description} />
    <meta property="og:site_name" content="CalendarDB" />
</svelte:head>
