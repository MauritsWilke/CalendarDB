<script>
    import getI18nStore from "scripts/i18n";
    import { setContext } from "svelte";

    setContext("i18n", getI18nStore());
</script>

<slot />
