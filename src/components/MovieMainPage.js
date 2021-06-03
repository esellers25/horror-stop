import {useParams,  useHistory} from "react-router-dom";
import {useState} from "react";
import { Card } from 'semantic-ui-react';

function MovieMainPage({movies, user}){
    const {id} = useParams();
    const history = useHistory();
    const selectedMovie = movies.find((movie) => movie.id == id)
    const [mainMovie, setMainMovie] = useState(selectedMovie)
    const [rating, setRating] = useState("")
    const [spookFactor, setSpookFactor] = useState(1)
    const [comment, setComment] = useState("")
    const {watch_providers, reviews} = mainMovie
    const [reviewArr, setReviewArr] = useState(reviews)

    const providersList = watch_providers.replace(/['"]+/g, '')
    const providers = providersList.slice(1, -1)
    const firstList = providers.split(",")
    const list = firstList.join()
    

    const reviewList = reviewArr.map((review) => 
        <>
            <Card className="review-cards" key={review.id}>
            {/* <h5>{user.username}</h5> */}
            <p>Rating: {review.rating}</p>
            <p>Spook Factor: {review.spook_factor}</p>
            <p>{review.comment}</p>
            {user && review.user_id === user.id ? <button onClick={() => handleDelete(review.id)}>x</button> : null}
            </Card>
        </>
    )

    const allRatings = reviewArr.map((review) => review.rating)
    const currentAverage = allRatings.length > 0 ? allRatings.reduce((a,b) => a + b, 0)/allRatings.length : 0
    const average = parseFloat(currentAverage).toFixed(1)
   

    function handleBackClick(){
        history.goBack()
    }

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
                // "Authorization": `Bearer ${localStorage.token}`,
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


    return(
        <div>
            <div>
            <button class="ui small button" onClick={handleBackClick}>Back</button><br/>
            <h2>{mainMovie.title}</h2>
            <h3>Release date: {mainMovie.year}</h3>
            <div className="main-content">
                <img className="main-movie-img"src={mainMovie.poster_url} alt={mainMovie.title}></img><br/>
                <section className="section">
                    <h4>Runtime: {mainMovie.runtime}</h4>
                    <h4>Summary</h4>
                        <p>{mainMovie.summary}</p>
                    <h4>Where to watch:</h4>
                    {watch_providers.length > 0 ? <p>{list}</p> : "Sorry, not available to stream!"}
                    <h4>Average User Review: {average}</h4>
                </section>
            </div>
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