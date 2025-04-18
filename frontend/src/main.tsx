import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "react-query";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.tsx";
import Provider from "./context/Provider.tsx";
import { ToastContainer } from "react-toastify";
import { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <Router>
      <Provider>
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
          <ToastContainer theme="dark" />
          <App />
        </SkeletonTheme>
      </Provider>
    </Router>
  </QueryClientProvider>
);
