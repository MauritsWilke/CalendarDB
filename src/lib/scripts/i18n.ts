import i18next from "i18next";
import { createI18nStore } from "svelte-i18next";
import HttpApi, { type HttpBackendOptions } from 'i18next-http-backend';

i18next
	.use(HttpApi)
	.init<HttpBackendOptions>({
		lng: "nl",
		backend: {
			"loadPath": "/locales/{{lng}}/default.json"
		},
	});

export default () => createI18nStore(i18next);