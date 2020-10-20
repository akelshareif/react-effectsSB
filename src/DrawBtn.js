import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';
import './DrawBtn.css';

const DrawBtn = ({ addCard }) => {
    // state in this component will contain deck identifier
    const [deckId, setDeckId] = useState(null);
    const [btnDisplay, setBtnDisplay] = useState(true);

    //useEffect will load on first render to call api and get deckId
    useEffect(() => {
        const getDeckData = async () => {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(res.data.deck_id);
        };

        getDeckData();
    }, []);

    const handleClick = async () => {
        // make api call to draw a card
        const {
            data: { cards, remaining },
        } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);
        console.log(remaining);
        if (remaining > 0) {
            // create a card component
            const card = <Card cardData={cards[0]} />;

            // call addCard to add it as state on the parent
            addCard((cards) => [...cards, card]);
        } else {
            setBtnDisplay(!btnDisplay);
        }
    };

    return btnDisplay ? (
        <div className="DrawBtn">
            <button onClick={handleClick}>Gimme A Card!</button>
        </div>
    ) : (
        <div className="ErrorMsg">Error: No cards remaining!</div>
    );
};

export default DrawBtn;
