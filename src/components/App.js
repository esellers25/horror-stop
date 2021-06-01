import {Switch, Route} from "react-router-dom";
// import '.src/App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";


function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/home">
          <Header />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
