import {Link} from "react-router-dom";
import { Card, Image } from 'semantic-ui-react';


function CategoryCard({category}){
    const {name, image, id} = category
    
    return (
        <div>
            <Link to={`/categories/${id}`}>
                <Card>
                    <Image src={image} />
                    <Card.Content>
                        <Card.Header>{name}</Card.Header>
                    </Card.Content>
                </Card> 
            </Link>
        </div>
    );
}

export default CategoryCard; 