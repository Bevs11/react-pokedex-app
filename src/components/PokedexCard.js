import './PokedexCard.css';
import { Link } from 'react-router-dom';

const PokedexCard = (props) => {
    return (
        <div className='pokedexCard__container'>
            
                <div className='pokedexCard__info'>
                    <img src={props.url} className='pokedexCard__image' />
                    <Link to={`/pokemon/${props.name}`}>
                        <p className='pokedexCard__name'><strong>{props.name}</strong></p>
                    </Link>
                    <div>Types: </div>
                    <div>
                        {
                        props.type.map(type => 
                            <Link to={`/pokemon/type/${type}`}>
                                <small>-{type}-</small>
                            </Link>
                        )
                        }
                    </div> 
                </div>
        </div>
    )
};

export default PokedexCard;
