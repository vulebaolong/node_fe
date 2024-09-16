import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "react-toastify/dist/ReactToastify.css";
import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./common/styles/global.css";
import "./common/styles/animation.css";
import Provider from "./common/provider/Provider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
   <Provider>
      <App />
   </Provider>
);
