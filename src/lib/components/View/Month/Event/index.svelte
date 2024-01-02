<script lang="ts">
    import type { Event } from "$lib/scripts/Event";
    import { Temporal } from "@js-temporal/polyfill";
    export let event: Event;
    if (!event) throw Error("No event was passed");

    const dateToDisplay = Temporal.Instant.fromEpochMilliseconds(event.data.date.start);
</script>

<div id="wrapper">
    <div id="icon">
        <p>{event.data.icon}</p>
    </div>

    <div id="title">
        <p>{event.data.title}</p>
    </div>

    <div id="time">
        <p>{dateToDisplay}</p>
    </div>
</div>
