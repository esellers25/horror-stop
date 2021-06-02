import {Link} from "react-router-dom";
import { Card } from 'semantic-ui-react';
import MovieList from "./MovieList";

function CategoryCard({category}){
    const {name, image, id, movies} = category
    
    return (
        <div>
            <Link to={`/categories/${id}`}>
                <Card 
                image={image}
                header={name}
                />
            </Link>
        </div>
    );
}

export default CategoryCard; 