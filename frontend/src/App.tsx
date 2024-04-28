import "react-toastify/dist/ReactToastify.css";
import RoutesConfig from "./routes/routesConfig";
import Header from "./features/Header/Header";

function App() {
  return (
    <div className="max-w-[1523px] w-full item-center ml-auto mr-auto h-full flex flex-col ">
      <Header />
      <RoutesConfig />
    </div>
  );
}

export default App;
