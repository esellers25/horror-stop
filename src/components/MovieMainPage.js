import {useParams} from "react-router-dom"

function MovieMainPage(){
    const {id} = useParams();
    console.log(id)
    return(
        <div>
            <h1>MOVIE LANDING PAGE</h1>
        </div>
    )
}

export default MovieMainPage; 