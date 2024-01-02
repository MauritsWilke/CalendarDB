<script lang="ts">
    import Day from "$lib/components/View/Month/Day/index.svelte";
    export let weekends = true;

    const namesOfDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

    const visibleWeeks = [
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
        [1, 2, 3, 4, 5, 6, 7],
    ];
</script>

<div id="wrapper">
    <div id="namesOfDays">
        {#each namesOfDays as day, i}
            {#if weekends || i < 5}
                <p>{day}</p>
            {/if}
        {/each}
    </div>

    <div id="content">
        {#each visibleWeeks as week, i}
            <div class="row">
                {#each visibleWeeks[i] as day, j}
                    {#if weekends || j < 5}
                        <Day date={i * 7 + j + 1} />
                    {/if}
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    #wrapper {
        flex: 1;
        height: 100%;

        // background-color: green;

        display: flex;
        flex-direction: column;
        align-items: center;

        #namesOfDays {
            display: flex;
            width: 100%;
            justify-content: space-between;
            align-items: flex-start;
            flex-shrink: 0;

            p {
                width: 100%;

                color: $primary-grey-70;
                text-align: center;
                leading-trim: both;
                text-edge: cap;
                font-family: Work Sans;
                font-size: 0.75rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
            }
        }

        #content {
            flex: 1 1 auto;
            width: 100%;

            display: flex;
            flex-direction: column;
            align-items: flex-start;
            gap: -1px;

            border-radius: 0.125rem;
            border-top: 1px solid $border;
            box-sizing: border-box;

            // background-color: purple;
            // overflow-y: auto;

            .row {
                display: flex;
                height: 8.5rem;
                align-items: flex-start;
                gap: -1px;
                align-self: stretch;
            }
        }
    }
</style>
