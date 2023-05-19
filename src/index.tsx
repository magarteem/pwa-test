import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ReturnScrollContext } from "./contextProvider/ReturnScrollContext";
import { store } from "./core/redux/app/store";
import * as serviceWorkerRegistration from "./serviceWorkerRegistration";
import "./styles/index.scss";
import "./styles/reset.scss";
import { ReturnScrollContextTs } from "./contextProvider/ReturnScrollContextTs";

const container = document.getElementById("root")!;
const root = createRoot(container);

root.render(
 <Provider store={store}>
  <BrowserRouter>
   {/*<ReturnScrollContext>*/}
   <ReturnScrollContextTs>
    <App />
   </ReturnScrollContextTs>
   {/*</ReturnScrollContext>*/}
  </BrowserRouter>
 </Provider>
);

serviceWorkerRegistration.register();
