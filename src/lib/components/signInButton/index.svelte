<button id="wrapper" on:click>
    <p>Sign in</p>
</button>

<style lang="scss">
    #wrapper {
        display: flex;
        padding: 1rem 0rem;
        justify-content: space-between;
        justify-content: center;
        align-self: stretch;

        border-radius: 0.125rem;
        border: 1px solid $highlight-blue-border;
        background: $highlight-blue-fill;

        cursor: pointer;

        p {
            color: $highlight-blue-border;
            text-align: center;
            leading-trim: both;
            text-edge: cap;
            font-family: Work Sans;
            font-size: 1rem;
            font-style: normal;
            font-weight: 600;
            line-height: normal;
        }
    }
</style>
