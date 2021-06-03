import {Switch, Route} from "react-router-dom";
import '../App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import MovieHome from "./MovieHome";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import MovieMainPage from "./MovieMainPage";
import { createGlobalStyle } from "styled-components";


function App() {

  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  const [user, setUser] = useState(null)


  useEffect(() => {
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then(categoryData => {
      setCategories(categoryData)
      console.log(categoryData)
      let movieGroupings = categoryData.map(( category) => category.movies)
      let allMovies = movieGroupings.flat()
      setMovies(allMovies)}
      )
      
  }, [])

  function onLogin(userInfo){
    setUser(userInfo)
  }
  
  const GlobalStyle= createGlobalStyle`
    body {
      background-color: #101010;
      margin: 0 10% 0 10%;
    }

    h1 {
      font-family: 'Butcherman', cursive;
      font-size: 8em;
      cursor: pointer;
      color: rgb(185 2 2 / 87%);
      text-align: center;
    }

    h1:hover {
      color: rgb(255 255 255 / 90%);
    }

    h2 {
      font-family: 'Oswald', sans-serif;
      font-size: 5em;
      color: white; 
    }

    h3 {
      font-family: 'Oswald', sans-serif;
      font-size: 2.7em;
      color: white; 
    }

    h4 {
      color: white; 
      font-family: 'Oswald', sans-serif;
      font-size: 1.9em;
    }

    h5 {
      color: white; 
      font-family: 'Oswald', sans-serif;
    }

    p {
      color: white;
      font-size: 1.5em;
    }

    a {
      font-family: 'Oswald', sans-serif;
      font-size: 1.7em;
      padding-right: 15px;
    }
  `


  return (
    <div>
      <GlobalStyle />
      <Header user={user}/>
      <Switch>
        <Route exact path="/">
          <Signup/>
        </Route>
        <Route exact path="/login">
          <Login handleLogin={onLogin}/>
        </Route>
        <Route exact path="/home">
          <MovieHome categories={categories}/>
        </Route>
        <Route exact path="/categories/:id">
          {categories.length === 0 ? null : <MovieList categories={categories}/>}
        </Route>
        <Route exact path="/movies/:id">
          {movies.length ===0 ? null: <MovieMainPage movies = {movies} user={user}/>}
        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
