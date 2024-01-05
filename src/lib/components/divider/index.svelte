<script lang="ts">
    export let text = "";
</script>

<div id="wrapper" class:withText={!!text}>
    <div id="rightBar" />
    <p style="display: {!!text ? 'block' : 'none'}">{text}</p>
    <div id="leftBar" />
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        width: 100%;
        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        #leftBar {
            width: 10.9375rem;
            height: 0.125rem;

            background: linear-gradient(90deg, #e3e3e2 0%, rgba(227, 227, 226, 0) 100%);
        }

        #rightBar {
            width: 10.9375rem;
            height: 0.125rem;

            background: linear-gradient(90deg, rgba(227, 227, 226, 0) 0%, #e3e3e2 100%);
        }

        p {
            color: $primary-grey-70;
            text-align: center;
            leading-trim: both;
            text-edge: cap;
            font-family: Work Sans;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }
    }

    .withText {
        align-items: center;
        gap: 0.5rem;
    }
</style>
