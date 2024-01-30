<script lang="ts">
    import { type Views } from "scripts/types";
    import Checkbox from "./checkbox/index.svelte";
    export let selectedView: Views = "Month";
    export let showWeekends = true;

    let visible = false;

    type SelectOption = { text: Views; shortcut: string };
    const selectOptions: SelectOption[] = [
        { text: "Day", shortcut: "D" },
        { text: "Week", shortcut: "W" },
        { text: "Month", shortcut: "M" },
        { text: "Table", shortcut: "T" },
    ];

    function updateView(e: SelectOption) {
        visible = false;
        selectedView = e.text;
    }

    function clickOutside(node: Node) {
        document.addEventListener("click", (e) => {
            const path = e.composedPath();
            if (!path.includes(node)) visible = false;
        });
    }
</script>

<div id="wrapper" use:clickOutside>
    <button id="button" class:clicked={visible} on:click={() => (visible = !visible)}>
        <p id="selectedView">{selectedView}</p>
        <img src="/icons/keyboard_arrow_down.svg" alt="arrow down" />
    </button>

    {#if visible}
        <div id="dropdown">
            {#each selectOptions as option}
                <button class="selectable" on:click|preventDefault={() => updateView(option)}>
                    <p class="text">{option.text}</p>
                    <p class="shortcut">{option.shortcut}</p>
                </button>
            {/each}

            <div id="line"></div>

            <button class="selectable" on:click={() => (showWeekends = !showWeekends)}>
                <p class="text">Show weekends</p>
                <Checkbox bind:checked={showWeekends}></Checkbox>
            </button>
        </div>
    {/if}
</div>

<style lang="scss">
    #wrapper {
        display: flex;
        flex-direction: column;
        gap: 1rem;

        position: relative;

        #button {
            display: flex;
            padding: 0.375rem 0.5rem 0.375rem 0.75rem;
            justify-content: center;
            align-items: center;
            gap: 0.5rem;

            border-radius: 0.125rem;
            border: 1px solid $border;
            background: #ffffff;

            cursor: pointer;

            #selectedView {
                color: $primary-grey;
                leading-trim: both;
                text-edge: cap;
                font-family: "Work Sans";
                font-size: 0.75rem;
                font-weight: 400;
            }

            // TODO add smooth animation to this
        }

        .clicked {
            // TODO find the proper way to do this
            background-color: $border !important;
        }

        #dropdown {
            display: flex;

            width: 9.25rem;
            flex-direction: column;
            justify-content: center;
            align-items: center;

            position: absolute;
            right: 0;
            top: calc(100% + 1rem);

            border-radius: 0.125rem;
            border: 1px solid $border;
            background: #fff;

            .selectable {
                display: flex;
                padding: 0.75rem;
                justify-content: space-between;
                align-items: center;
                align-self: stretch;

                background-color: transparent;
                border: none;

                cursor: pointer;

                .text {
                    color: $primary-grey;
                    leading-trim: both;
                    text-edge: cap;
                    font-family: "Work Sans";
                    font-size: 0.75rem;
                    font-weight: 400;
                }

                .shortcut {
                    color: $primary-grey-70;
                    text-align: right;
                    leading-trim: both;
                    text-edge: cap;
                    font-family: "Work Sans";
                    font-size: 0.75rem;
                    font-weight: 400;
                }

                &:hover {
                    background: $border;
                }
            }

            #line {
                width: 100%;
                height: 1px;
                background: #e9e9e7;
            }
        }
    }
</style>
