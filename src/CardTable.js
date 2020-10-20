import React, { useState } from 'react';
import DrawBtn from './DrawBtn';
import './CardTable.css';

const CardTable = () => {
    const [cards, setCards] = useState([]);

    return (
        <div>
            <DrawBtn addCard={setCards} />
            <div className="CardTable">{cards}</div>
        </div>
    );
};

export default CardTable;
