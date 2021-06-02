import CategoryCard from "./CategoryCard";
import MovieList from "./MovieList";
import { Card } from 'semantic-ui-react';

function MovieHome({categories}){
    
    let categoryList = categories.map((category) => <CategoryCard key={category.id} category={category}/>)
    
    return(
        <div>
            <h1>HOME PAGE</h1>
            <Card.Group >
                {categoryList}
            </Card.Group>
        </div>
    )
}

export default MovieHome;