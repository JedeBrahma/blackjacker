import React from "react";
import { useState, useEffect } from "react";
import { Button, Row, Modal } from "react-bootstrap";
import Deck from "../DeckClass.js";
import Rules from "./Rules.js";
import CardShow from "./CardShow.js";

function BlackJack() {
  const [deck, setDeck] = useState([]);
  const [playerHand, setPlayerHand] = useState([]);
  const [dealerHand, setDealerHand] = useState([]);
  const [playerTotal, setPlayerTotal] = useState(0);
  const [dealerTotal, setDealerTotal] = useState(0);
  const [startGame, setStartGame] = useState(false);
  //handle ace
  const [playerAce, setPlayerAce] = useState(false);
  const [dealerAce, setDealerAce] = useState(false);
  //modal
  const [show, setShow] = useState(false);
  const [winner, setWinner] = useState("");

  const handleClose = () => {
    setShow(false);
    setDeck(new Deck().cards);
    setStartGame(false);
    setPlayerHand([]);
    setDealerHand([]);
  };

  useEffect(() => {
    setDeck(new Deck().cards);
  }, []);

  useEffect(() => {
    calculate();
    console.log("hello")
  }, [playerHand, dealerHand, winner, playerTotal, dealerTotal]);

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
    let player = [0]; //0
    let dealer = [0]; 

    // playerHand.map((card) => {
    //   player[0] += card.value;

    // })
    playerHand.map((card) => {
      let temp = player[0];
      player[0] += card.value;

      if (card.value === 1) {
        setPlayerAce(true);
        player.push(card.value + 10 + temp);
      }
    });
    dealerHand.map((card) => {
      let temp = dealer[0];
      dealer[0] += card.value;
      if (card.value === 1) {
        setDealerAce(true);
        dealer.push(card.value + 10 + temp);
      }
    });

    if (playerAce && player[0] + 10 < 21 && player[1] <= 21) {
      setPlayerTotal(player.pop());
    } else {
      setPlayerTotal(player[0]);
    }
    if (dealerAce && dealer[0] + 10 < 21 && dealer[1] <= 21) {
      setDealerTotal(dealer.pop());
    } else {
      setDealerTotal(dealer[0]);
    }

    if (playerTotal >= 21 || dealerTotal >= 21) {
      checkWinner();
    }
  };

  const checkWinner = () => {
    //Check Ace
    //If we find an Ace, hand = 2 values, if one of the value goes over 21,
    //delete it and only keep other one

    if (dealerTotal > 21) {
      setWinner("Player");
      setShow(true);
      return;
    } else if (playerTotal > 21) {
      setWinner("Dealer");
      setShow(true);
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

  //modal pop up if winner is truthy
  return (
    <div className="px-0 py-0">
      <h1>?????? Black Jack ??????</h1>
      {startGame && (
        <>
          <div>
            <h6>Dealer Cards</h6>
            <Row xs={2} lg={3} className="g-0 py-0">
              {dealerHand.map((card) => {
                return <CardShow card={card} />;
              })}
            </Row>
            <Row>
              <h5>Dealer Total: {dealerTotal}</h5>
            </Row>
          </div>
          <div>
            <h6>Player Cards</h6>
            <Row xs={2} lg={3} className="g-0 py-0">
              {playerHand.map((card) => {
                return <CardShow card={card} />;
              })}
            </Row>
            <Row>
              <h5>Player Total: {playerTotal} </h5>
            </Row>
          </div>
        </>
      )}
      {startGame ? (
        <div className="g-50 py-50" style={{ margin: 10 }}>
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
          {winner === "Player" ? (
            <Modal.Body>Winner Winner Chicken Dinner</Modal.Body>
          ) : winner === "Dealer" ? (
            <Modal.Body>You win sum... you lose sum...</Modal.Body>
          ) : (
            <Modal.Body> It's a tie!!</Modal.Body>
          )}

          <Modal.Footer>
            <Button variant="success" onClick={handleClose}>
              New Game
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
      <p>Brought to you by Mason, John, Kim, Adnan, Tom, Jimmy</p>
    </div>
  );
}

export default BlackJack;
