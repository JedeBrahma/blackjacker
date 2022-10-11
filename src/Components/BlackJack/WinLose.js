import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function WinLose({setWinner, winner}) {
  
  const handleClose = () => setWinner("");

  return (
    <div>
        <Modal>
        <Modal.Header closeButton>
          <Modal.Title>BAM!</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, {winner} wins!</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Reset Game
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default WinLose