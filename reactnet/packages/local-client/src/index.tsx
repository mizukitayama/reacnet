import "bulmaswatch/superhero/bulmaswatch.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { createRoot } from "react-dom/client";
import { Helmet } from "react-helmet";
import { Provider } from "react-redux";
import { store } from "./state";
import CellList from "./components/cell-list";
import "./style.css"

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <Helmet>
          <title>MorphoseJS</title>
        </Helmet>
        <div className="wrapper">
          <CellList />
        </div>
      </div>
    </Provider>
  );
};

const rootElement = document.getElementById("root");
const root = createRoot(rootElement!);
root.render(<App />);
