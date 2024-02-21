import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import AuthProvider from "./components/Auth/AuthProvider";
import AudioProvider from "./components/Audio/AudioProvider";
import FileProvider from "./components/File/FileProvider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthProvider>
      <FileProvider>
        <AudioProvider>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </AudioProvider>
      </FileProvider>
    </AuthProvider>
  </React.StrictMode>,
);

// reportWebVitals();
