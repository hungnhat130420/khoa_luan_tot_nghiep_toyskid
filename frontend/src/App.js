import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import SignIn from "./components/Home/pages/SignIn";
function App() {
  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Home to="/home" />
        </Route>
        <Route path="/signin">
          <SignIn />
        </Route>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
