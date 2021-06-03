import {useParams} from "react-router-dom";
import {useState} from "react";
import { Card } from 'semantic-ui-react';

function MovieMainPage({movies, user}){
    const {id} = useParams();
    const selectedMovie = movies.find((movie) => movie.id == id)
    const [mainMovie, setMainMovie] = useState(selectedMovie)
    const [rating, setRating] = useState("")
    const [spookFactor, setSpookFactor] = useState(1)
    const [comment, setComment] = useState("")
    const {watch_providers, reviews} = mainMovie
    const [reviewArr, setReviewArr] = useState(reviews)
    

    const providersList = watch_providers.replace(/['"]+/g, '')
    const providers = providersList.slice(1, -1)
    const list = providers.split(",")

    const reviewList = reviewArr.map((review) => 
        <>
            <Card>
            <p>Rating: {review.rating}</p>
            <p>Spook Factor: {review.spook_factor}</p>
            <p>{review.comment}</p>
            {user && review.user_id === user.id ? <button onClick={() => handleDelete(review.id)}>x</button> : null}
            </Card>
        </>
    )

    function handleDelete(id){
        fetch(`http://localhost:3000/reviews/${id}`, {
            method: "DELETE"
        })
        .then(r => r.json())
        .then(deletedMessage =>{
            const updatedReviews = reviewArr.filter((review) => review.id !== id)
            setReviewArr(updatedReviews)
            console.log(reviewArr)
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        fetch("http://localhost:3000/reviews", {
            method: "POST",
            headers: {
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                rating: parseInt(rating),
                spook_factor: parseInt(spookFactor),
                comment: comment,
                movie_id: parseInt(id), 
                user_id: user.id 
            })
        })
        .then(r => r.json())
        .then(newReview => {
            const updatedReviews = [...reviewArr, newReview]
            setReviewArr(updatedReviews)
            setComment("")
            setRating("")
            setSpookFactor(1)
        })
    }


const providersAll = list.map((provider) => <p key={provider}>{provider}</p>)

    return(
        <div>
            <div>
            <h1>{mainMovie.title}</h1>
            <h2>Release date: {mainMovie.year}</h2>
            <img src={mainMovie.poster_url} alt={mainMovie.title}></img>
            <h5>Runtime: {mainMovie.runtime}</h5>
            <p>Description: {mainMovie.summary}</p>
            <h5>Where to watch:</h5>
            {watch_providers.length > 0 ? providersAll : "Sorry, not available to stream!"}
            <h3>User Reviews</h3>
            {reviewList}
            </div>
            <div>
                <h3>Add Your Review!</h3>
                <form onSubmit={handleSubmit}>
                    <label htmlFor={"rating"}>Rating</label>
                    <input id="rating" value={rating} onChange={(e) => setRating(e.target.value)} type="number" min={1} max={10}></input>
                    <label htmlFor={"spookFactor"}>Spook Factor</label>
                    <select id="spookFactor" value={spookFactor} onChange={e => setSpookFactor(e.target.value)}>
                        <option value="1">💀</option>
                        <option value="2">💀💀</option>
                        <option value="3">💀💀💀</option>
                        <option value="4">💀💀💀💀</option>
                        <option value="5">💀💀💀💀💀</option>
                    </select>
                    <label htmlFor={"comment"} >Comment</label>
                    <input id="comment" value={comment} onChange={e => setComment(e.target.value)}></input>
                    <button>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default MovieMainPage; 