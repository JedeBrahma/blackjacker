import { Component } from "react";
import Card from "./CardClass.js";

export class Deck extends Component {
  constructor() {
    super()
    this.cards = [];
    this.create();
    this.shuffle();
  }

  create() {
    const suits = ["❤︎", "♦︎", "♣︎", "♠️"]; //this loops through each suit
    for (let i = 0; i < suits.length; i++) {
      for (let j = 1; j <= 13; j++) {//this will run for each suit 13 time beginning at 1 and thus creating cards 1 through 13
        if (j === 1) {
          this.cards.push(new Card("Ace", 1, suits[i]))
        } else if (j === 11) {
          this.cards.push(new Card("Jack", 10, suits[i]))
        } else if (j === 12) {
          this.cards.push(new Card("Queen", 10, suits[i]))
        } else if (j === 13) {
          this.cards.push(new Card("King", 10, suits[i]))
        } else {
          this.cards.push(new Card(j, j, suits[i]))
        }
      }
    }
  }
  shuffle() {
    let counter = this.cards.length
    let placeHolder
    let i

    while (counter > 0) {
      i = Math.floor(Math.random() * counter--)
      placeHolder = this.cards[counter]
      this.cards[counter] = this.cards[i]
      this.cards[i] = placeHolder
    }
  }
}

export default Deck;
