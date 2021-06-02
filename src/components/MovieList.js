import MovieCard from "./MovieCard";
import {useParams} from "react-router-dom"
import {useState} from "react"; 

function MovieList({categories, onClickMovie}){
    const {id} = useParams();
    console.log(categories)
    
    let selectedCategory = categories.find(category => category.id == id)
    let selectedMovies = selectedCategory.movies 
    console.log(selectedMovies)
    let movieCards = selectedMovies.map((movie) => 
    <MovieCard 
    key={movie.id} 
    movie={movie}
    onClickMovie={onClickMovie}
    />)

    return(
        <div>
            <h1>List PAGE</h1>
            {movieCards}
        </div>
    )
}

export default MovieList;