import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/dropzone/styles.css";
import ReactDOM from "react-dom/client";
import "react-toastify/dist/ReactToastify.css";
import App from "./App.tsx";
import Provider from "./common/provider/Provider.tsx";
import "./common/styles/animation.css";
import "./common/styles/global.css";
import { BASE_DOMAIN_API, IS_CONSOLE_LOG, isProduction } from "./constant/app.constant.ts";

if (isProduction) {
   if (!localStorage.getItem(IS_CONSOLE_LOG)) {
      console.log = function () {};
      console.warn = function () {};
      console.error = function () {};
   }
}

console.log({
   BASE_DOMAIN_API,
   isProduction,
   "import.meta.env.VITE_IS_PRODUCTION": import.meta.env.VITE_IS_PRODUCTION,
   "import.meta.env.VITE_BASE_DOMAIN_API": import.meta.env.VITE_BASE_DOMAIN_API,
});


ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider>
      <App />
   </Provider>
);
