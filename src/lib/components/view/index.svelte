<script lang="ts">
    import ViewDropdown from "./viewDropdown/index.svelte";
    import Month from "./month/index.svelte";

    import { monthNames } from "scripts/translations";
    import { capitalise } from "scripts/utils";
    import { type Views } from "scripts/types";
    import { Temporal } from "@js-temporal/polyfill";

    // Constants
    const calendar = new Temporal.Calendar("iso8601");
    const currentDate = Temporal.Now.plainDate(calendar);

    // Variables
    // TODO store these settings in localStorage?
    let visibleMonth = monthNames[currentDate.month - 1];
    let visibleYear = currentDate.year;
    let selectedView: Views = "Month";
    let showWeekends = true;
</script>

<div id="wrapper">
    <div id="header">
        <div id="info">
            <p id="month">{capitalise(visibleMonth)}</p>
            <p id="year">{visibleYear}</p>
        </div>

        <div id="controls">
            <ViewDropdown bind:selectedView bind:showWeekends></ViewDropdown>
        </div>
    </div>

    <div id="view">
        <Month {showWeekends}></Month>
    </div>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        align-items: start; // Prevents children from stretching
        flex-direction: column;
        width: 100%;

        #header {
            display: flex;
            height: 4.75rem;
            width: 100%;

            justify-content: space-between;
            align-items: center;

            // TODO the text is not visually cented, fix needed
            #info {
                display: flex;
                flex-direction: column;
                justify-content: space-between;

                height: auto;

                margin: {
                    top: 0.75rem;
                    bottom: 0.75rem;
                    left: 1rem;
                }

                #month {
                    color: $primary-grey;
                    leading-trim: both;
                    text-edge: cap;
                    font-family: "Work Sans";
                    font-size: 1.5rem;
                    font-weight: 600;
                }

                #year {
                    color: $primary-grey-70;
                    leading-trim: both;
                    text-edge: cap;
                    font-family: "Work Sans";
                    font-size: 0.75rem;
                    font-weight: 400;
                }
            }

            #controls {
                margin: {
                    top: 1.5rem;
                    bottom: 1.5rem;
                    right: 1rem;
                }
            }
        }

        #view {
            box-sizing: border-box;
            width: 100%;
            height: 100%;

            overflow: hidden;

            padding: {
                left: 1rem;
                right: 1rem;
            }
        }
    }
</style>
