import "./App.css";
import Admin from "./components/Admin/Admin";
import Home from "./components/Home/Home";
import { Route, Switch } from "react-router-dom";
import index1 from "./components/Admin/pages/index1";
import index2 from "./components/Admin/pages/index2";
import index3 from "./components/Home/pages/index3";
import index4 from "./components/Home/pages/index4";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/admin" component={Admin} />
        <Route path="/home" component={Home} />
        <Route path="/index1" component={index1} />
        <Route path="/index2" component={index2} />
        <Route path="/index3" component={index3} />
        <Route path="/index4" component={index4} />
      </Switch>
    </div>
  );
}

export default App;
