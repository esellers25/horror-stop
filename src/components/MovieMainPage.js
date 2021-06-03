import {useParams} from "react-router-dom";
import {useState} from "react";

function MovieMainPage({movies}){
    const {id} = useParams();
    const selectedMovie = movies.find((movie) => movie.id == id)
    const [mainMovie, setMainMovie] = useState(selectedMovie)
    const {watch_providers} = mainMovie

    const providersList = watch_providers.replace(/['"]+/g, '')
    const providers = providersList.slice(1, -1)
    const list = providers.split(",")


const providersAll = list.map((provider) => <p key={provider}>{provider}</p>)

    return(
        <div>
            <h1>{mainMovie.title}</h1>
            <h2>Release date: {mainMovie.year}</h2>
            <img src={mainMovie.poster_url} alt={mainMovie.title}></img>
            <h5>Runtime: {mainMovie.runtime}</h5>
            <p>Description: {mainMovie.summary}</p>
            <h5>Where to watch:</h5>
            {watch_providers.length > 0 ? providersAll : "Sorry, not available to stream!"}

        </div>
    )
}

export default MovieMainPage; 