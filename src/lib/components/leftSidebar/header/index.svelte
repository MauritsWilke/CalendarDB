<script lang="ts">
    import { Temporal } from "@js-temporal/polyfill";
    let subtitle = "v2.0.24";

    const subtitles = ["Test content, delete this", "[object Object]", "Check out minecraftpfp.com"];

    // TODO add hanukkah, it's complicated :(
    const dates: { [key: string]: string } = {
        "02-29": "Wait, what is the date?",
        "09-26": "It's the devs birthday 🎉🥳",
        "08-08": "International cat day 🐱",
        // These references should maybe be toggleable?
        "10-31": "Boo 👻🎃",
        "12-25": "Merry Christmas! 🎄",
        "12-31": `Almost ${+Temporal.Now.plainDateISO().toString().slice(0, 4) + 1} 🎊`,
        "01-01": "Happy new year! 🎇",
    };

    const currentDate = Temporal.Now.plainDateISO().toString().slice(5);

    if (Math.random() < 0.03) subtitle = subtitles[Math.floor(Math.random() * subtitles.length)];
    subtitle = dates?.[currentDate] ?? subtitle;
</script>

<div id="wrapper">
    <div id="text">
        <h1>CalendarDB</h1>
        <p>{subtitle}</p>
    </div>
</div>

<style lang="scss">
    #wrapper {
        // # Layout
        display: flex;
        width: 100%;

        // TODO unsure if this is the best way to do this, feel free to improve
        padding: {
            left: 15px;
            top: 15px;
            bottom: 15px;
        }

        #text {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: flex-start;
            gap: 0.1875rem;

            h1 {
                color: $primary-grey;
                font-family: Work Sans;
                font-size: 1.5rem;
                font-weight: 500;
            }

            p {
                color: $primary-grey-70;
                font-family: Work Sans;
                font-size: 0.75rem;
                font-weight: 400;
            }
        }
    }
</style>
