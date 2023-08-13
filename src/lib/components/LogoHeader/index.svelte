<script lang="ts">
    export let randomise = true;

    let subtitle = "v2.0.24";

    const subtitles = ["Test content, delete this", "[object Object]", "Check out minecraftpfp.com"];

    if (randomise && Math.random() < 0.03) {
        subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
    }
</script>

<div id="wrapper">
    <h1 id="title">CalendarDB</h1>
    <h3 id="subtitle">{subtitle}</h3>
</div>

<style lang="scss">
    #wrapper {
        display: inline-flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 0.1875rem;

        #title {
            color: $primary-grey;
            font-family: Work Sans;
            font-size: 1.5rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        #subtitle {
            color: $primary-grey-70;
            font-family: Work Sans;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;
        }
    }
</style>
