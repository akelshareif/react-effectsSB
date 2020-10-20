import React from 'react';
import './Card.css';

const Card = ({ cardData }) => {
    return (
        <div>
            <img className="Card" src={cardData.image} alt={`${cardData.value} ${cardData.suit}`} />
        </div>
    );
};

export default Card;
