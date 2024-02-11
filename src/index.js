import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./components/User-Old/userContext";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider";
import AudioProvider from "./components/Audio/AudioProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AudioProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AudioProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// reportWebVitals();
