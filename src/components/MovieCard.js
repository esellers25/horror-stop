import {useHistory} from "react-router-dom";

function MovieCard({movie}){
    const {id, title, poster_url} = movie 
    const history = useHistory()
  

    function handleClick(){
        history.push(`/movies/${id}`)
    }

    return(
        <div>
            <h1>{title}</h1>
            <img onClick={handleClick} src={poster_url} alt={title}/>  
        </div>
    )
}

export default MovieCard;