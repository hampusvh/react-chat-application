import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./styles/Global.css";

// ----------------------------------------

import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://b81470fe7f262afd85de1fa398028a4c@o4509853252255744.ingest.de.sentry.io/4509853258678352",
});

// ----------------------------------------

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
