import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Card from './Card';

const AutoDrawBtn = ({ addCard }) => {
    // state in this component will contain deck identifier
    const [deckId, setDeckId] = useState(null);
    const [btnDisplay, setBtnDisplay] = useState(true);
    const [btnText, setBtnText] = useState('Start Drawing');

    const intervalId = useRef();

    //useEffect will load on first render to call api and get deckId
    useEffect(() => {
        const getDeckData = async () => {
            const res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
            setDeckId(res.data.deck_id);
        };

        getDeckData();
    }, []);

    const handleClick = async () => {
        if (intervalId.current) {
            clearInterval(intervalId.current);
            intervalId.current = null;
            setBtnText('Start Drawing');
        } else {
            setBtnText('Stop Drawing');
            intervalId.current = setInterval(async () => {
                // make api call to draw a card
                const {
                    data: { cards, remaining },
                } = await axios.get(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`);

                if (remaining > 0) {
                    // create a card component
                    const card = <Card key={cards[0].code} cardData={cards[0]} />;

                    // call addCard to add it as state on the parent
                    addCard((cards) => [...cards, card]);
                } else {
                    setBtnDisplay(!btnDisplay);
                }
            }, 1000);
        }
    };

    // if there are cards remaining, display draw button, else display error message
    return btnDisplay ? (
        <div className="DrawBtn">
            <button onClick={handleClick}>{btnText}</button>
        </div>
    ) : (
        <div className="ErrorMsg">Error: No cards remaining!</div>
    );
};

export default AutoDrawBtn;
