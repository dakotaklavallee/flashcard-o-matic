import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteCard } from "../../utils/api";

//This component provides a given deck's DeckPage component (or "Landing Page") with one of its containing card's information.
//It accepts destructured values from the deck's card and displays it accordingly.

export default function CardView({
  cardId,
  deckId,
  front,
  back,
  handleCardEdit,
}) {
  //We destructure the "go" functionality of the useHistory hook for the card deletion handler.
  const { go } = useHistory();

  //Should a user click on the delete button of a given card in the list, they will be prompted with a confirmation window.
  //If they accept, the card is deleted and the page is refreshed. Otherwise, the window is ignored and disappears.
  const cardDeleteHandler = async (e) => {
    e.preventDefault();
    if (
      window.confirm("Delete this card? You will not be able to recover it.")
    ) {
      await deleteCard(cardId);
      go(0);
    }
  };

  //This return displays the card's information wrapped within a Bootstrap "card".
  return (
    <div className="card">
      <div className="card-body">
        <div className="row">
          <div className="col-6">
            <p>{front}</p>
          </div>
          <div className="col-6">
            <div className="row">
              <p>{back}</p>
            </div>
            <div className="row">
              <Link
                to={`/decks/${deckId}/cards/${cardId}/edit`}
                className="btn btn-secondary"
                onClick={handleCardEdit}
              >
                Edit
              </Link>
              <button
                type="button"
                className="btn btn-danger mx-2"
                onClick={cardDeleteHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
