import React from "react";
import { useState, useEffect } from "react";
import { Button, Card, Row, Modal } from "react-bootstrap";
import Deck from "../DeckClass.js";
import Rules from "./Rules.js";
import CardShow from "./CardShow.js";
import WinLose from "./WinLose.js";

function BlackJack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [startGame, setStartGame] = useState(false);
  const [winner, setWinner] = useState("");
  const [playerAce, setPlayerAce] = useState(false);
  const [dealerAce, setDealerAce] = useState(false);
  //modal
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false)
    
  };

  useEffect(() => {
    setDeck(new Deck().cards);
  }, []);

  useEffect(() => {
    calculate();
  }, [playerHand, dealerHand, winner]);

  const play = () => {
    setPlayerHand([...playerHand, deck.pop(), deck.pop()]);
    setDealerHand([...dealerHand, deck.pop(), deck.pop()]);
    calculate();
    setStartGame(true);
  };

  const hit = () => {
    setPlayerHand([...playerHand, deck.pop()]);
    calculate();
  };

  const calculate = () => {
    let player = [0];
    let dealer = [0];
    playerHand.map((card) => {
      player[0] += card.value;
      if (card.value === 1) {
        setPlayerAce(true);
        player.push += card.value + 10;
      }
    });
    dealerHand.map((card) => {
      dealer[0] += card.value;
      if (card.value === 1) {
        setDealerAce(true);
        dealer.push += card.value + 10;
      }
    });

    if (playerAce && player[0] > 21) {
      setPlayerTotal(player.pop());
    } else {
      setPlayerTotal(player);
    }
    if (dealerAce && dealer[0] > 21) {
      setDealerTotal(dealer.pop());
    } else {
      setDealerTotal(dealer);
    }

    if (player >= 21 || dealer >= 21) {
      checkWinner();
    }
  };

  const checkWinner = () => {
    //Check Ace
    //If we find an Ace, hand = 2 values, if one of the value goes over 21,
    //delete it and only keep other one
    
    if (dealerTotal > 21) {
      setWinner("Player");
      return;
    } else if (playerTotal > 21) {
      setWinner("Dealer");
      return;
    } else if (playerTotal > dealerTotal) {
      setWinner("Player");
    } else if (dealerTotal > playerTotal) {
      setWinner("Dealer");
    } else {
      setWinner("Tie");
    }
    setShow(true);
  };
  console.log(winner);
  //modal pop up if winner is truthy
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
      {startGame ? (
        <div>
          <Button onClick={hit} variant="outline-success">
            {" "}
            HIT{" "}
          </Button>
          <Button variant="outline-danger" onClick={checkWinner}>
            {" "}
            STAND{" "}
          </Button>{" "}
        </div>
      ) : (
        <Button onClick={play} variant="warning">
          START GAME
        </Button>
      )}

      <Rules />

      <div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>BAM!</Modal.Title>
          </Modal.Header>
          {winner == "Player" ? <Modal.Body>Winner Winner Chicken Dinner</Modal.Body> : winner == "Dealer" ? <Modal.Body>You win sum... you lose sum...</Modal.Body> : <Modal.Body> It's a tie!!</Modal.Body>}
          
          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              New Game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default BlackJack;
