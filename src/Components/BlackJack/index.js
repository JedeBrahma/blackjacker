import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Row } from "react-bootstrap";
import Deck from "../DeckClass.js";
import Rules from "./Rules.js";
import CardShow from "./CardShow.js";

function BlackJack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setdealerTotal] = useState(0);

  useEffect(() => {
    setDeck(new Deck().cards);
  }, []);

  useEffect(() => {
    calculate()
  }, [playerHand, dealerHand]);

  const play = () => {
    setPlayerHand([...playerHand, deck.pop(), deck.pop()]);
    setDealerHand([...dealerHand, deck.pop(), deck.pop()]);
    calculate()
  };

  const calculate = () => {
    let player = 0
    let dealer = 0
    playerHand.map((card) => {
      player += card.value
    })
    dealerHand.map((card) => {
      dealer += card.value
    })
    setPlayerTotal(player)
    setdealerTotal(dealer)
  }
  return (
    <div className="px-5 py-5">
      <div>
        <h2>Dealer Cards</h2>
        <Row xs={2} lg={3} className="g-5 py-5">
          {dealerHand.map((card) => {
            return <CardShow card={card} />;
          })}
        </Row>
        <Row>
          <h4>Dealer Toal: {dealerTotal}</h4>
        </Row>
      </div>
      <div>
        <h2>Player Cards</h2>
        <Row xs={2} lg={3} className="g-5 py-5">
          {playerHand.map((card) => {
            return <CardShow card={card} />;
          })}
        </Row>
        <Row>
          <h4>Player Toal: {playerTotal} </h4>
        </Row>
      </div>

      <Button onClick={play} variant="warning">
        START GAME
      </Button>
      <Rules />
    </div>
  );
}

export default BlackJack;
