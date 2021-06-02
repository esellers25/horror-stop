import MovieCard from "./MovieCard";
import {useParams} from "react-router-dom"

function MovieList({categories}){
    const {id} = useParams();
    console.log(categories)
    let selectedCategory = categories.find((category) => category.id === id)
    // let movieList = selectedCategory.movies 
    console.log(selectedCategory)

    return(
        <div>
            <h1>List PAGE</h1>
            <MovieCard/>
        </div>
    )
}

export default MovieList;