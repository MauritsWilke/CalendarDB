<script lang="ts">
    import { debounce } from "$lib/scripts/utils";
    let value = "";

    function clearSearch(e: Event) {
        document.getElementById("searchBar")?.focus(); // TODO prevent the short flickering of focussed-unfocused-focussed
        value = "";
    }

    function handleSearch(query: string) {
        if (!query) return;
        console.log(query);
    }

    const debounced = debounce(handleSearch, 300);
    $: debounced(value);
</script>

<form>
    <input id="searchBar" type="text" placeholder="Search events..." bind:value />
    {#if value}
        <button on:click|preventDefault={clearSearch}>
            <img src="/icons/close.svg" alt="search" />
        </button>
    {:else}
        <img src="/icons/search.svg" alt="search" />
    {/if}
</form>

<style lang="scss">
    form {
        position: relative;
        width: 15.5rem;

        input {
            display: flex;
            height: 2rem;
            width: 100%;
            box-sizing: border-box;
            justify-content: center;
            align-items: center;

            flex-shrink: 1;
            padding-left: 0.5rem;
            padding-right: 2rem;

            border-radius: 0.125rem;
            border: 1px solid $border;
            background: #fff;

            outline: none;

            // text
            color: $primary-grey;
            leading-trim: both;
            text-edge: cap;
            font-family: Work Sans;
            font-size: 0.75rem;
            font-style: normal;
            font-weight: 400;
            line-height: normal;

            &::placeholder {
                color: $primary-grey-70;
                leading-trim: both;
                text-edge: cap;
                font-family: Work Sans;
                font-size: 0.75rem;
                font-style: normal;
                font-weight: 500;
                line-height: normal;
            }

            &:focus {
                outline: none;
                border: none;
                border: 1px solid $highlight-blue-border;
                box-shadow: inset 0 0 1px $highlight-blue-border;
            }
        }

        img {
            position: absolute;
            box-sizing: border-box;

            right: 0.5rem;
            top: 0;
            bottom: 0;
            margin: auto 0;

            width: 1.25rem;
            height: 1.25rem;
            flex-shrink: 0;
        }

        button {
            position: absolute;
            box-sizing: border-box;
            background-color: transparent;
            border: none;

            right: 0rem;
            top: 0;
            bottom: 0;
            margin: auto 0;

            width: 1.25rem;
            height: 1.25rem;
            flex-shrink: 0;

            cursor: pointer;

            img {
                position: absolute;
                box-sizing: border-box;

                width: 1.25rem;
                height: 1.25rem;
                flex-shrink: 0;
            }
        }
    }
</style>
