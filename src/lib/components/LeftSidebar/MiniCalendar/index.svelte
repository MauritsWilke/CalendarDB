<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill";
    export let weekNumbers = true;

    // Constants
    const dayTitles = ["M", "T", "W", "T", "F", "S", "S"];
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const calendar = new Temporal.Calendar("iso8601");
    const currentDate = Temporal.Now.plainDate(calendar);
    type visibleDay = Temporal.PlainDate;

    // Variables
    let DELTA = 0;
    let visibleWeeks: visibleDay[][] = [[], [], [], [], [], []];
    let visibleMonthName = monthNames[currentDate.month - 1];
    let visibleYear = currentDate.year;
    let currentWeekNumber = 0;
    let arrayHoldingCurrentDay = 0;
    let requestedDate = currentDate;
    $: getMonth(DELTA); // Load current month;

    function getMonth(delta: number) {
        visibleWeeks = [[], [], [], [], [], []];

        requestedDate = Temporal.Now.plainDate(calendar).add(
            Temporal.Duration.from({
                months: delta,
            })
        );

        const startDayOfMonth = requestedDate.add(
            Temporal.Duration.from({
                days: -requestedDate.day + 1,
            })
        ).dayOfWeek;
        const daysFromPreviousMonth = startDayOfMonth - 1;

        for (let i = daysFromPreviousMonth; i > 0; i--) {
            const day = requestedDate.add(
                Temporal.Duration.from({
                    days: -currentDate.day - i + 1,
                })
            );
            visibleWeeks[0].push(day);
        }

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (visibleWeeks[i][j]) continue;
                const day = requestedDate.add(
                    Temporal.Duration.from({
                        days: i * 7 + j - requestedDate.day - daysFromPreviousMonth + 1,
                    })
                );
                visibleWeeks[i].push(day);
            }
        }

        currentWeekNumber = requestedDate.weekOfYear;
        arrayHoldingCurrentDay = visibleWeeks.findIndex((week) => {
            return week.find((day) => day.equals(requestedDate)) !== undefined;
        });

        visibleMonthName = monthNames[requestedDate.month - 1];
        visibleYear = requestedDate.year;
    }

    function doSomethingWithDay(day: Temporal.PlainDate) {
        console.log(day.toString());
    }

    function resetDelta(e: MouseEvent) {
        if (e.button === 1) DELTA = 0;
    }
</script>

<!-- Middle clicking to reset delta seemed like a good feature to me, a11y disagreed -->
<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions -->
<div id="wrapper" on:auxclick={resetDelta}>
    <div id="header">
        <p id="monthName">{visibleMonthName} {visibleYear}</p>

        <div id="controls">
            <button on:click={() => DELTA--}>
                <img id="previousMonth" src="/icons/arrow.svg" alt="previous month" />
            </button>
            <button on:click={() => DELTA++} id="nextMonth">
                <img src="/icons/arrow.svg" alt="next month" />
            </button>
        </div>
    </div>
    <div id="content">
        <div id="weekTitles">
            {#if weekNumbers}
                <div class="dayTitle">
                    <p />
                </div>
            {/if}

            {#each dayTitles as dayTitle}
                <div class="dayTitle">
                    <p>{dayTitle}</p>
                </div>
            {/each}
        </div>

        {#each visibleWeeks as week, i}
            <div class="week">
                {#if weekNumbers}
                    <div class={i !== 5 ? "weekNumber" : "lastWeekNumber"}>
                        <p>{currentWeekNumber + i - arrayHoldingCurrentDay}</p>
                    </div>
                {/if}

                {#each week as day}
                    <button class="day {day.equals(currentDate) ? 'current' : day.month === requestedDate.month ? '' : 'notCurrentMonth'}" on:click={() => doSomethingWithDay(day)}>
                        <p>{day.day}</p>
                    </button>
                {/each}
            </div>
        {/each}
    </div>
</div>

<style lang="scss">
    @mixin defaultDay {
        background-color: transparent;
        border: none;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        width: 1.5rem;
        height: 1.5rem;
        border-radius: 50%;

        color: $primary-grey;
        text-align: center;
        leading-trim: both;
        text-edge: cap;

        /* small calendar/number */
        font-family: Work Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 400;
        line-height: normal;

        &:hover {
            background: $border;
            cursor: pointer;
        }
    }

    @mixin infoBox {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 0.5rem;

        width: 1.5rem;
        height: 1.5rem;

        color: $primary-grey;
        text-align: center;
        leading-trim: both;
        text-edge: cap;

        /* small calendar/dates */
        font-family: Work Sans;
        font-size: 0.75rem;
        font-style: normal;
        font-weight: 500;
        line-height: normal;
    }

    #wrapper {
        width: 15.5rem;
        flex-shrink: 0;

        display: flex;
        flex-direction: column;
        justify-content: center;
        gap: 0.25rem;

        border-radius: 0.125rem;
        border: 1px solid $border;
        background: #fff;

        box-sizing: border-box;

        #header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;

            padding: {
                left: 1rem;
                right: 0.5rem;
                top: 0.75rem;
            }

            #monthName {
                color: $primary-grey;
                text-align: center;
                leading-trim: both;
                text-edge: cap;
                font-family: Work Sans;
                font-size: 1rem;
                font-style: normal;
                font-weight: 600;
                line-height: normal;
            }

            #controls {
                button {
                    background-color: transparent;
                    border: none;

                    width: 1.5rem;
                    height: 1.5rem;
                    flex-shrink: 0;

                    cursor: pointer;
                }

                #nextMonth {
                    transform: rotate(180deg);
                }
            }
        }

        #content {
            display: flex;
            height: 12.5rem;

            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;

            padding: 0.75rem;
            padding-top: 0rem;

            #weekTitles {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                align-self: stretch;
                height: 1.5rem;

                .dayTitle {
                    @include infoBox;
                }
            }

            .week {
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                align-self: stretch;

                .day {
                    @include defaultDay;
                }

                .current {
                    @include defaultDay;
                    border-radius: 50%;
                    background: $highlight;

                    color: #fff;

                    &:hover {
                        background: mix($border, $highlight, 20%);
                        cursor: pointer;
                    }
                }

                .notCurrentMonth {
                    @include defaultDay;

                    color: $primary-grey-70;
                }
            }

            .weekNumber {
                @include infoBox;
                background: #f8f8f8;

                // I have not found a different solution as easy as this one
                box-shadow: 0px 1rem 0px 0px #f8f8f8;
            }

            .lastWeekNumber {
                @include infoBox;
                background: #f8f8f8;
            }
        }
    }
</style>
