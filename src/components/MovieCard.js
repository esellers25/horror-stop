import {Link} from "react-router-dom";

function MovieCard({movie}){
    const {id, title, poster_url} = movie 
   

    return(
        <div>
            <Link to={`/movies/${id}`}>
            <h1>{title}</h1>
            </Link>
            <img src={poster_url} alt={title}/>
            {/* <h3>Release Data: {year}</h3>
            <h5>Runtime: {runtime}</h5>
            <h5>Category: {category}</h5>
            <ul>
                {watchProviders}
            </ul>
            <p>Summary: {summary}</p> */}
        </div>
    )
}

export default MovieCard;