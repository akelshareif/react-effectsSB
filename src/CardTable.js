import React, { useState } from 'react';
import DrawBtn from './DrawBtn';
import AutoDrawBtn from './AutoDrawBtn';
import './CardTable.css';

const CardTable = () => {
    const [cards, setCards] = useState([]);

    return (
        <div>
            {/* <DrawBtn addCard={setCards} /> */}
            <AutoDrawBtn addCard={setCards} />

            <div className="CardStack">{cards}</div>
        </div>
    );
};

export default CardTable;
