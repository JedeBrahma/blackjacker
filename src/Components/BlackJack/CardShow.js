import React from 'react'
import { Button, Card } from "react-bootstrap";
import tim from "../../Assets/tim.png"

function CardShow({card}) {
  return (
    <Card className="text-center">
      <Card.Header>{card.face} {card.suit}</Card.Header>
      <Card.Body>
        <Card.Img className="py-3" variant="top" src={tim} style={{width:"300px"}}
        />
        </Card.Body>
      <Card.Footer>{card.suit} {card.face} </Card.Footer>
    </Card>
  )
}

export default CardShow