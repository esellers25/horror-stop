import {Link} from "react-router-dom";
import { Card } from 'semantic-ui-react';


function CategoryCard({category}){
    const {name, image, id} = category
    
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