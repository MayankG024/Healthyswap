
  import { createRoot } from "react-dom/client";
  import App from "./app/App.tsx";
  import ErrorBoundary from "./app/components/ErrorBoundary.tsx";
  import "./styles/index.css";
  import { BrowserRouter } from "react-router-dom";

  createRoot(document.getElementById("root")!).render(
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  );
  