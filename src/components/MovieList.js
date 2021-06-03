import MovieCard from "./MovieCard";
import {useParams} from "react-router-dom"


function MovieList({categories}){
    const {id} = useParams();
    
    let selectedCategory = categories.find(category => category.id == id)
    let selectedMovies = selectedCategory.movies 
    let movieCards = selectedMovies.map((movie) => 
    <MovieCard 
    key={movie.id} 
    movie={movie}
    />)

    return(
        <div>
            <h3>{selectedCategory.name} Movies</h3>
            {movieCards}
        </div>
    )
}

export default MovieList;