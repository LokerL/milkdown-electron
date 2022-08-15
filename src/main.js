import { createApp } from "vue";
import App from "./App.vue";
import "./assets/base.css";
import "./assets/milkdown.css";

createApp(App)
  .mount("#app")
  .$nextTick(() => {
    postMessage({ payload: "removeLoading" }, "*");
  });
