import {useHistory} from "react-router-dom";

function MovieCard({movie}){
    const {id, title, poster_url} = movie 
    const history = useHistory()
  

    function handleClick(){
        history.push(`/movies/${id}`)
    }

    return(
        <div className="card" onClick={handleClick}>
            <h4 className="movie-card">{title}</h4>
            <img className="movie-pic" src={poster_url} alt={title}/>  
        </div>
    )
}

export default MovieCard;