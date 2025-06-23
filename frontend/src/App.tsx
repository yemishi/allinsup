import "react-toastify/dist/ReactToastify.css";
import RoutesConfig from "./routes/routesConfig";
import Header from "./components/Header/Header";
import Analytics from "./analytics/Analytics";

function App() {
  return (
    <div className="max-w-[1523px] w-full item-center ml-auto mr-auto h-full flex flex-col ">
      <Header />
      <RoutesConfig />
      <Analytics />
    </div>
  );
}

export default App;
