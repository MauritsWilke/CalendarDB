<script lang="ts">
    import type { Event } from "$lib/scripts/Event";
    import EventComponent from "$lib/components/View/Month/Event/index.svelte";

    export let currentDay = false;
    export let date = -1;
    export let events: Event[] = [];
</script>

<div id="wrapper">
    <div class="date {currentDay ? 'currentDay' : ''}">
        <p>{date}</p>
    </div>
    <div id="content">
        {#each events as event}
            <EventComponent {event} />
        {/each}
    </div>
</div>

<style lang="scss">
    #wrapper {
        width: 100%;
        height: 100%;

        position: relative;

        border: 1px solid #e9e9e7;
        box-sizing: border-box;

        .date {
            position: absolute;
            top: 0.5rem;
            right: 0.5rem;

            display: flex;
            width: 1.25rem;
            height: 1.25rem;

            justify-content: center;
            align-items: center;

            p {
                text-align: center;
                leading-trim: both;
                text-edge: cap;
                font-family: Work Sans;
                font-size: 0.75rem;
                font-style: normal;
                font-weight: 400;
                line-height: normal;
                color: $primary-grey;
            }
        }

        .currentDay {
            border-radius: 50%;
            background: #eb5757;

            p {
                color: #fff;
            }
        }
    }
</style>
