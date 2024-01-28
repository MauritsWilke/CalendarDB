<script lang="ts">
    import { type Views } from "scripts/types";
    import ViewDropdown from "./viewDropdown/index.svelte";
    import { Temporal } from "@js-temporal/polyfill";

    // Constants
    const calendar = new Temporal.Calendar("iso8601");
    const currentDate = Temporal.Now.plainDate(calendar);
    // TODO This line is in several places, maybe central place with naming and such
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    // Variables
    let visibleMonth = monthNames[currentDate.month - 1];
    let visibleYear = currentDate.year;
    let selectedView: Views = "Month";
</script>

<div id="wrapper">
    <div id="header">
        <div id="info">
            <p id="month">{visibleMonth}</p>
            <p id="year">{visibleYear}</p>
        </div>

        <div id="controls">
            <ViewDropdown bind:selectedView></ViewDropdown>
            <!-- <p>{selectedView}</p> -->
        </div>
    </div>
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        align-items: start; // Prevents children from stretching
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
    }
</style>
