import {useParams} from "react-router-dom"
import {useState} from "react"

function MovieMainPage({selectedMovie}){

console.log(selectedMovie)
    return(
        <div>
            <h1>{selectedMovie.title}</h1>
            <h2>Release date: {selectedMovie.year}</h2>
            <img src={selectedMovie.poster_url}></img>
            <p>Description: {selectedMovie.summary}</p>
            <p>Where to watch: {selectedMovie.watch_providers}</p>
            <p>{selectedMovie.runtime}</p>

        </div>
    )
}

export default MovieMainPage; 