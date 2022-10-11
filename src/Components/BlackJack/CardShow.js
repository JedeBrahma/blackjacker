import React from 'react'
import { Card } from "react-bootstrap";
import tim from "../../Assets/tim.png"

function CardShow({card}) {
  return (
    <Card className="" style={{width:150 , height:200 , marginLeft: 10}}>
      <Card.Header>{card.face} {card.suit}</Card.Header>
      <Card.Body>
        <Card.Img className="py-3" variant="top" src={tim} style={{width:"50px"}}
        />
        </Card.Body>
      <Card.Footer>{card.suit} {card.face} </Card.Footer>
    </Card>
  )
}

export default CardShow