import  { Component } from "react";

export class Card extends Component {
  constructor(face, value, suit) {
    super()
    this.face = face;
    this.value = value;
    this.suit = suit;
  }
}

export default Card;
