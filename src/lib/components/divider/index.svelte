<script lang="ts">
    import { onMount } from "svelte";

    export let text = "";
    export let fade = true;

    let wrapper: HTMLElement;
    onMount(() => {
        if (fade) return;
        wrapper.style.setProperty(`--fill-left`, "#e3e3e2");
        wrapper.style.setProperty(`--fill-right`, "#e3e3e2");
    });
</script>

<div id="wrapper" class:withText={!!text} bind:this={wrapper}>
    <div id="rightBar" />
    <p style="display: {!!text ? 'block' : 'none'}">{text}</p>
    <div id="leftBar" />
</div>

<style lang="scss">
    #wrapper {
        --fill-left: linear-gradient(90deg, #e3e3e2 0%, rgba(227, 227, 226, 0) 100%);
        --fill-right: linear-gradient(90deg, rgba(227, 227, 226, 0) 0%, #e3e3e2 100%);

        display: flex;
        width: 100%;

        justify-content: center;
        align-items: center;
        flex-shrink: 0;

        #leftBar {
            width: 100%;
            height: 0.125rem;

            background: var(--fill-left);
        }

        #rightBar {
            width: 100%;
            height: 0.125rem;

            background: var(--fill-right);
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
