import {Link, useHistory} from "react-router-dom";



function MovieCard({movie, onClickMovie}){
    const {id, title, poster_url} = movie 

    const history = useHistory()
    
    console.log(movie)

    function handleClick(){
     onClickMovie(id)
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