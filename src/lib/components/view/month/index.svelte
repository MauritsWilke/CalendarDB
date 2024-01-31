<script lang="ts">
    import { dayAbbreviations } from "scripts/translations";
    import { capitalise } from "scripts/utils";
    export let showWeekends = true;

    // Constants

    // Variables
    let visibleWeeks = [[], [], [], [], [], [], [], [], [], []]; // TODO find a good number for here
</script>

<div id="wrapper">
    <div id="dayNames">
        {#each dayAbbreviations as day, i}
            {#if showWeekends || i < 5}
                <div class="nameWrapper">
                    <p class="name">{capitalise(day)}</p>
                </div>
            {/if}
        {/each}
    </div>

    <div id="content">
        {#each visibleWeeks as week}
            <div class="week">
                {#each { length: showWeekends ? 7 : 5 } as _, i}
                    <div class="day">
                        <div class="icons">
                            <div class="date">{i + 1}</div>
                        </div>

                        <div class="events"></div>
                    </div>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 0.5rem;

        width: 100%;
        height: 100%;

        #dayNames {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            width: 100%;

            .nameWrapper {
                display: flex;
                width: 100%;
                justify-content: center;
                align-self: stretch;
            }

            .name {
                color: $primary-grey-70;
                text-align: center;
                leading-trim: both;
                text-edge: cap;
                font-family: "Work Sans";
                font-size: 0.75rem;
                font-weight: 400;
            }
        }

        #content {
            display: flex;
            flex-direction: column;
            width: 100%;

            border-top: 1px solid $border;

            border-radius: 0.125rem 0.125rem 0 0;

            overflow: hidden;

            .week {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                height: 8.5rem;
                flex-shrink: 0;
                align-items: flex-start;
                align-self: stretch;

                .day {
                    display: flex;
                    align-self: stretch;

                    flex: 1;

                    border-left: 1px solid #e9e9e7;
                    border-bottom: 1px solid #e9e9e7;

                    &:last-child {
                        border-right: 1px solid #e9e9e7;
                    }

                    .icons {
                        display: flex;
                        justify-content: flex-end;

                        width: 100%;
                        height: calc(1.25rem + 0.5rem + 0.5rem);

                        .date {
                            display: flex;
                            width: 1.25rem;
                            height: 1.25rem;

                            margin-right: 0.5rem;
                            margin-top: 0.5rem;

                            justify-content: center;
                            align-items: center;

                            color: $primary-grey;
                            text-align: center;
                            leading-trim: both;
                            text-edge: cap;
                            font-family: "Work Sans";
                            font-size: 0.75rem;
                            font-weight: 400;
                        }
                    }
                }

                &:first-child {
                    .day {
                        &:first-child {
                            border-radius: 0.125rem 0 0 0;
                        }
                        &:last-child {
                            border-radius: 0 0.125rem 0 0;
                        }
                    }
                }
            }
        }
    }
</style>
