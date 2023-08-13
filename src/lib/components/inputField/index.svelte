<script lang="ts">
    export let placeholder = "placeholder";
    export let value = "";

    export let type = "text";

    function typeAction(node: HTMLInputElement) {
        node.type = type;
    }
</script>

<input id="wrapper" use:typeAction {placeholder} bind:value />

<style lang="scss">
    #wrapper {
        display: flex;
        padding: 1rem;
        align-items: center;
        gap: 1rem;
        align-self: stretch;

        border-radius: 0.125rem;
        border: 1px solid $primary-grey;

        color: $primary-grey;
        leading-trim: both;
        text-edge: cap;
        font-family: Work Sans;
        font-size: 1rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;

        outline: none;

        &::placeholder {
            color: rgba(59, 59, 59, 0.5);
            leading-trim: both;
            text-edge: cap;
            font-family: Work Sans;
            font-size: 1rem;
            font-style: normal;
            font-weight: 500;
            line-height: normal;
        }

        &:focus {
            border: 1px solid $highlight-blue-border;
            box-shadow: inset 0 0 1px $highlight-blue-border;
        }
    }
</style>
