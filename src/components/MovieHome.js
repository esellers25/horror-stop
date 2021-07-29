import CategoryCard from "./CategoryCard";
import { Card } from 'semantic-ui-react';

function MovieHome({categories}){
    
    let categoryList = categories.map((category) => <CategoryCard key={category.id} category={category}/>)
    
    return(
        <div className="catCards">
            <h1 className="homePage">Choose your fright...</h1>
            <Card.Group >
                {categoryList}
            </Card.Group>
        </div>
    )
}

export default MovieHome;