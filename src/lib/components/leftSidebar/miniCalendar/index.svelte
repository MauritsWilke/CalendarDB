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
    let visibleWeekNumbers = [1, 2, 3, 4, 5, 6];
    let visibleMonth = currentDate.month;
    let visibleYear = 2023;

    $: getMonth(DELTA);

    function getMonth(delta: number) {
        visibleWeeks = [[], [], [], [], [], []];
        visibleWeekNumbers = [];

        const deltaMonthDuration = Temporal.Duration.from({ months: delta });
        const requestedDate = Temporal.Now.plainDate(calendar).add(deltaMonthDuration);

        const deltaDayDuration = Temporal.Duration.from({ days: -requestedDate.day + 1 }); // + 1, because months are not arrays
        const firstDayOfMonth = requestedDate.add(deltaDayDuration).dayOfWeek;
        const daysToAddFromPrevious = firstDayOfMonth - 1;

        for (let i = daysToAddFromPrevious; i > 0; i--) {
            const dayDelta = Temporal.Duration.from({ days: -i }).add(deltaDayDuration);
            const day = requestedDate.add(dayDelta);

            visibleWeeks[0].push(day);
        }

        for (let i = 0; i < 6; i++) {
            for (let j = 0; j < 7; j++) {
                if (visibleWeeks[i][j]) continue;

                // i * 7 = weeks, j = days, remove requested date to get to 0 (hence +1), remove daysToAddFromPrevious to fix the j
                const dayDelta = Temporal.Duration.from({ days: i * 7 + j - requestedDate.day + 1 - daysToAddFromPrevious });
                const day = requestedDate.add(dayDelta);

                visibleWeeks[i].push(day);
            }

            visibleWeekNumbers[i] = visibleWeeks[i][0].weekOfYear;
        }

        visibleMonth = requestedDate.month;
        visibleYear = requestedDate.year;
    }

    function resetDelta(e: MouseEvent) {
        if (e.button === 1) DELTA = 0;
    }

    function doSomethingWithDay(day: Temporal.PlainDate) {
        // TODO add functionality to this
        console.log(day.toString());
    }

    function scrollEvent(e: WheelEvent) {
        // TODO decide on functionality -> shift+scroll = year?
        // TODO is scrolling up delta++ or delta--
        if (e.ctrlKey) return;
        if (e.deltaY > 0) DELTA++;
        if (e.deltaY < 0) DELTA--;
    }
</script>

<div id="wrapper" on:auxclick={resetDelta} on:wheel={scrollEvent}>
    <div id="header">
        <p id="monthName">{monthNames[visibleMonth - 1]} {visibleYear}</p>

        <div id="controls">
            <button on:click={() => DELTA--}>
                <img src="/icons/arrow.svg" alt="Previous month" title="Previous month" />
            </button>
            <button on:click={() => DELTA++}>
                <img src="/icons/arrow.svg" alt="Next month" id="nextMonth" title="Next month" />
            </button>
        </div>
    </div>

    <div id="content">
        {#if weekNumbers}
            <div id="weekNumbers">
                <p class="weekNumber"></p>

                {#each { length: 6 } as _, i}
                    <p class="weekNumber">{visibleWeekNumbers[i]}</p>
                {/each}
            </div>
        {/if}

        <div id="weeks">
            <div id="weekTitles">
                {#each dayTitles as dayTitle}
                    <div class="dayTitle">
                        <p>{dayTitle}</p>
                    </div>
                {/each}
            </div>

            {#each visibleWeeks as week, i}
                <div class="week">
                    {#each week as day}
                        <button class="day" class:today={day.equals(currentDate)} class:previousMonth={day.month !== visibleMonth} on:click={() => doSomethingWithDay(day)}>
                            <p>{day.day}</p>
                        </button>
                    {/each}
                </div>
            {/each}
        </div>
    </div>
</div>

<!-- TODO this styling is not a 100% match with the Figma design, there are like 2 annoying extra pixels that I cannot find -->
<style lang="scss">
    @mixin defaultBox {
        display: flex;
        justify-content: center;
        align-items: center;

        width: 1.5rem;
        height: 1.5rem;

        text-align: center;
        leading-trim: both;
        text-edge: cap;

        font-family: "Work Sans";
    }

    #wrapper {
        width: 15.5rem;
        flex-shrink: 0;

        border-radius: 0.125rem;
        border: 1px solid $border;
        background: #fff;

        #header {
            display: flex;
            flex-direction: row;
            justify-content: space-between;
            align-items: center;

            width: 14rem;

            margin: {
                right: 0.75rem;
                top: 0.75rem;
                left: 0.75rem;
                bottom: 0.375rem;
            }

            #monthName {
                padding-left: 0.3125rem; // Small adjustment to make the month and week numbers in line

                color: $primary-grey;
                text-align: center;
                leading-trim: both;
                text-edge: cap;
                font-family: "Work Sans";
                font-size: 1rem;
                font-weight: 600;
            }

            // TODO make the hover animation centred relative to the arrows
            #controls {
                display: flex;
                flex-direction: row;
                justify-content: space-between;

                width: calc(1.5rem + 1.5rem + 6px); // 2 times the button + the spacing in between

                button {
                    background-color: transparent;
                    border: none;

                    width: 1.5rem;
                    height: 1.5rem;
                    flex-shrink: 0;

                    border-radius: 50%;

                    cursor: pointer;

                    &:hover {
                        background: $border;
                        cursor: pointer;
                    }
                }

                #nextMonth {
                    transform: rotate(180deg);
                }
            }
        }

        #content {
            display: flex;
            flex-direction: row;

            height: 12.5rem;
            width: 14rem;

            margin: 0.75rem;
            margin-top: 0rem; // I know I can set it seperately, this is easier to read
            padding-top: 0;

            #weekNumbers {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                background-color: #f8f8f8;

                .weekNumber {
                    @include defaultBox;

                    color: $primary-grey;
                    text-align: center;
                    leading-trim: both;
                    text-edge: cap;

                    font-family: "Work Sans";
                    font-size: 0.75rem;
                    font-weight: 500;

                    &:first-child {
                        background-color: #fff; // Make the first square not grey
                    }
                }
            }

            #weeks {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                width: 100%;

                #weekTitles {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .dayTitle {
                        @include defaultBox;

                        color: $primary-grey;
                        text-align: center;
                        leading-trim: both;
                        text-edge: cap;

                        font-size: 0.75rem;
                        font-weight: 500;
                    }
                }

                .week {
                    display: flex;
                    flex-direction: row;
                    justify-content: space-between;

                    .day {
                        @include defaultBox;

                        color: $primary-grey;
                        text-align: center;
                        leading-trim: both;
                        text-edge: cap;

                        font-family: "Work Sans";
                        font-size: 0.75rem;
                        font-weight: 400;

                        border-radius: 50%;

                        background-color: transparent;
                        border: none;

                        &:hover {
                            background: $border;
                            cursor: pointer;
                        }
                    }

                    .today {
                        background: $highlight;

                        color: #fff;

                        &:hover {
                            background: mix($border, $highlight, 20%);
                            cursor: pointer;
                        }
                    }

                    .previousMonth {
                        @include defaultBox;
                        color: $primary-grey-70;
                        text-align: center;
                        leading-trim: both;
                        text-edge: cap;

                        font-size: 0.75rem;
                        font-weight: 400;
                    }
                }
            }
        }
    }
</style>
