<!-- 
	This is a V0.5 of the monthly view, infinite scrolling through the months is yet to come
 -->

<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill";
    import { t } from "i18next";
    import { capitalise } from "scripts/utils";
    export let showWeekends = true;

    // Constants
    const calendar = new Temporal.Calendar("iso8601"); // TODO this is used basically everywhere, maybe a global variable?
    const currentDate = Temporal.Now.plainDate(calendar);
    type visibleDay = Temporal.PlainDate;

    // Variables
    let DELTA = 0;
    let visibleWeeks: visibleDay[][] = [[], [], [], [], []];
    let visibleWeekNumbers = [1, 2, 3, 4, 5, 6];
    let visibleMonth = currentDate.month;

    $: getMonth(DELTA);

    // Similar, but not exactly the same as the mini calendar one
    // TODO maybe have this function in a centralised script file?
    function getMonth(delta: number) {
        visibleWeeks = [[], [], [], [], []];
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

        for (let i = 0; i < visibleWeeks.length; i++) {
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
    }
</script>

<div id="wrapper">
    <div id="dayNames">
        {#each { length: 7 } as day, i}
            {#if showWeekends || i < 5}
                <div class="nameWrapper">
                    <p class="name">{capitalise(t(`generic.dayAbbreviations.${i + 1}`))}</p>
                </div>
            {/if}
        {/each}
    </div>

    <div id="content">
        {#each visibleWeeks as week}
            <div class="week">
                {#each { length: showWeekends ? 7 : 5 } as _, i}
                    {@const day = week[i]}
                    <div class="day" class:weekend={i > 4}>
                        <div class="icons">
                            <div class="date" class:today={day.equals(currentDate)} class:previousMonth={day.month !== visibleMonth}>{day.day}</div>
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

                        .today {
                            background: $highlight;
                            border-radius: 50%;

                            color: #fff;
                        }

                        .previousMonth {
                            color: $primary-grey-70;
                        }
                    }
                }

                .weekend {
                    background: $off-white;
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
