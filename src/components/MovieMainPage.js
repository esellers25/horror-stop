import {useParams,  useHistory} from "react-router-dom";
import {useState} from "react";
import { Button } from 'semantic-ui-react';

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
    
    const releaseYear = mainMovie.year.slice(0, 4)
    console.log(user)
    const reviewList = reviewArr.map((review) => 
        <>
            <div className="review-cards" key={review.id}>
            <h5>{user.username}</h5>
            <p>Rating: {review.rating}</p>
            <p>Spook Factor: {displaySkulls(review.spook_factor)}</p>
            <p>{review.comment}</p>
            {user && review.user_id === parseInt(user.id) ? <Button id="reviewButton" onClick={() => handleDelete(review.id)}>Send this review to Hell</Button> : null}
            </div>
        </>
    )

    const allRatings = reviewArr.map((review) => review.rating)
    const currentAverage = allRatings.length > 0 ? allRatings.reduce((a,b) => a + b, 0)/allRatings.length : 0
    const average = parseFloat(currentAverage).toFixed(1)
   
    const allSpooks = reviewArr.map((review) => review.spook_factor)
    const firstSpookAvg = allSpooks.length > 0 ? allSpooks.reduce((a,b) => a + b, 0)/allSpooks.length : 0
    const spookAverage = parseInt(firstSpookAvg).toFixed()

    function displaySkulls(avg){
        if (avg === 1) {
            return "💀"
        }
        else if (avg === 2) {
            return "💀💀"
        }
        else if (avg === 3) {
            return "💀💀💀"
        }
        else if (avg === 4) {
            return "💀💀💀💀"
        }
        else if (avg === 5) {
            return "💀💀💀💀💀"
        }
    }

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
            console.log(newReview)
            const updatedReviews = [...reviewArr, newReview]
            setReviewArr(updatedReviews)
            setComment("")
            setRating("")
            setSpookFactor(1)
        })
    }

    return(
        <div>
            <div >
                <h3 className="mainTitle">{mainMovie.title} ({releaseYear})</h3>
                <div className="alignMain">
                    <div className="main-content">
                        <img className="main-movie-img"src={mainMovie.poster_url} alt={mainMovie.title}></img><br/>
                        <section className="section">
                            <h4>Runtime: {mainMovie.runtime}</h4>
                            <h4>Summary</h4>
                                <p>{mainMovie.summary}</p>
                            <h4>Where to watch:</h4>
                            {watch_providers.length > 0 ? <p>{list}</p> : "Sorry, not available to stream!"}
                            <h4>Average User Review: {average}</h4>
                            <h4>Average Spook Factor: {spookAverage}</h4><p>{displaySkulls(spookAverage)}</p>
                        </section>
                    </div>
                </div>
                <button class="ui small button" onClick={handleBackClick}>Back</button><br/>
            </div>
            <h3>User Reviews</h3>
            <div className="review-container">
            {reviewList}
            </div>
            <div className="add-review-container">
                <h3>Add Your Review!</h3>
                <div className="display-container">
                <form className="review-form" onSubmit={handleSubmit}>
                    <label htmlFor="rating" className="review-data-field">Rating</label>
                    <input id="rating" className="review-data-field" value={rating} onChange={(e) => setRating(e.target.value)} type="number" min={1} max={10}></input>
                    <label htmlFor="spookFactor" className="review-data-field">Spook Factor</label>
                    <select id="spookFactor" className="review-data-field" value={spookFactor} onChange={e => setSpookFactor(e.target.value)}>
                        <option value="1">💀</option>
                        <option value="2">💀💀</option>
                        <option value="3">💀💀💀</option>
                        <option value="4">💀💀💀💀</option>
                        <option value="5">💀💀💀💀💀</option>
                    </select>
                    <label htmlFor="comment" className="review-data-field">Comment</label>
                    <input id="comment" className="review-data-field" value={comment} onChange={e => setComment(e.target.value)}></input>
                    <button className="review-data-field">Submit</button>
                </form>
                </div>
            </div>
            <div className="bullshit">

            </div>
        </div>
    )
}

export default MovieMainPage; 