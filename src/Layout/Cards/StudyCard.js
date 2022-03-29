import React from "react";

//This component displays the front or back of a card.
//It also contains a flip and next button to flip a side or advance to the next card within the deck.
//The next button only displays on the back-side of the studied card.

export default function StudyCard({ side, flipHandler, handleNext, front, back, totalCards, cardIndex }) {
  return (
    <>
      <div className="card mb-2">
        <div className="card-body">
          <div>
            <h5 className="card-title">
              Card {cardIndex + 1} of {totalCards}
            </h5>
          </div>
          <p className="card-text">{side === "front" ? front : back}</p>
          <div className="row">
            <div className="col-2">
              <button onClick={flipHandler} className="btn btn-secondary">
                Flip
              </button>
            </div>
            <div className="col-2">
              {side === "back" ? <button onClick={handleNext} className="btn btn-primary">Next</button> : null}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
