import { createApp } from "vue";
import App from "../Vue/App.vue";
import { createYmaps } from "vue-yandex-maps";
import { hostReactAppReady } from "../../common/js/utils";

const app = createApp(App);

hostReactAppReady().then(() => {
	app.use(
		createYmaps({
			apikey: "49de5080-fb39-46f1-924b-dee5ddbad2f1&lang=ru-RU",
		}),
	);
	app.mount("#app");
});
