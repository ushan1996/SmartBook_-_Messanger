import Home from "./pages/home/Home";
import Profile from "./pages/profile/Profile";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import Messanger from "./components/messanger/Messanger";

function App() {
  const {user} = useContext(AuthContext)
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          {user ? <Home /> :  <Register /> }
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/"/> : <Login />}
        </Route>
        <Route path="/register">
        {user ? <Redirect to="/"/> : <Register />}
        </Route>
        <Route path="/messanger">
        {!user ? <Redirect to="/"/> : <Messanger />}
        </Route>
        <Route path="/profile/:username">
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
 