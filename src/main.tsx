import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import '@mantine/dropzone/styles.css';
import "./common/styles/global.css";
import "./common/styles/animation.css";
import Provider from "./common/provider/Provider.tsx";
import { IS_CONSOLE_LOG, isProduction } from "./constant/app.constant.ts";

if (isProduction) {
   if (!localStorage.getItem(IS_CONSOLE_LOG)) {
     console.log = function () {};
     console.warn = function () {};
     console.error = function () {};
   }
 }

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider>
      <App />
   </Provider>
);
