import {Link} from "react-router-dom";
import { Card, Image } from 'semantic-ui-react';


function CategoryCard({category}){
    const {name, image, id} = category
    
    return (
        <div>
            <Link to={`/categories/${id}`}>
                <div className="category-card">
                    <img className="category-pic" src={image} />
                    <h4 className="movie-card">{name}</h4>
                </div> 
            </Link>
        </div>
    );
}

export default CategoryCard; 