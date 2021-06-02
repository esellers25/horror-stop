import {Switch, Route} from "react-router-dom";
// import '.src/App.css';
import Signup from "./Signup";
import Login from "./Login";
import Header from "./Header";
import MovieHome from "./MovieHome";
import { useEffect, useState } from "react";
import MovieList from "./MovieList";
import MovieMainPage from "./MovieMainPage";


function App() {

  const [categories, setCategories] = useState([])
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState({})


  useEffect(() => {
    fetch("http://localhost:3000/categories")
    .then(r => r.json())
    .then(categoryData => {
      setCategories(categoryData)
      let movieGroupings = categoryData.map(( category) => category.movies)
      console.log(movieGroupings)
      let allMovies = movieGroupings.flat()
      setMovies(allMovies)}
      )
      
  }, [])

  function setClickedMovie(id){
  const movieOnPage = movies.find((movie) => movie.id == id)
  setSelectedMovie(movieOnPage)
  }

  console.log(movies)

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
          {categories.length === 0? null : <MovieList onClickMovie={setClickedMovie}categories={categories}/>}
        </Route>
        <Route exact path="/movies/:id">
        {selectedMovie.length === 0? null : <MovieMainPage selectedMovie = {selectedMovie}/>}

        </Route>
      </Switch>
      
    </div>
  );
}

export default App;
