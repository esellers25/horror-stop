import {Switch, Route} from "react-router-dom";
// import '.src/App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import MovieHome from "./MovieHome";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";


function App() {

  const [categories, setCategories] = useState([])

  useEffect(() => {
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then(categoryData => setCategories(categoryData))
  }, [])

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
          <MovieHome categories={categories}/>
        </Route>
        <Route exact path="/categories/:id">
          <MovieList categories={categories}/>
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
