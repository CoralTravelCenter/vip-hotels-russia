import {createApp} from "vue";
import {Skeletor} from "vue-skeletor";
import "vue-skeletor/dist/vue-skeletor.css";
import {createYmaps} from "vue-yandex-maps";
import {hostReactAppReady} from "../../common/js/utils";
import App from "../Vue/App.vue";

const app = createApp(App);

hostReactAppReady().then(() => {
	app.component(Skeletor.name, Skeletor);
	app.use(
		createYmaps({
			apikey: "49de5080-fb39-46f1-924b-dee5ddbad2f1&lang=ru-RU",
		}),
	);
	app.mount("#app");
});
