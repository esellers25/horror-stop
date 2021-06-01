import {Switch, Route} from "react-router-dom";
// import '.src/App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import MovieHome from "./MovieHome";


function App() {
  return (
    <div>
      <Header/>
      <Switch>
        <Route exact path="/">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login/>
        </Route>
        <Route exact path="/home">
          <MovieHome />
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
