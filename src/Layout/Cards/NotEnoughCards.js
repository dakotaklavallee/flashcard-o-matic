import React from "react";
import { Link } from "react-router-dom";

//This component shows a message when there are not enough cards to study a deck. 
//It accepts cards as a prop to display the current card total.

export default function NotEnoughCards({ cards }) {
  return (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. There are {cards.length} in this
        deck.
      </p>
      <Link to="" className="btn btn-primary">
        + Add Cards
      </Link>
    </div>
  );
}
