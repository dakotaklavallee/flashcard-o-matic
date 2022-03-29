import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck, deleteDeck } from "../../utils/api";
import CardView from "../Cards/CardView";

//This is a component containing the logic and rendering for a selected deck's "landing page".
//It contains and displays the deck's name, description, features, and its current cards. Both sides of the card are shown at once.

export default function DeckPage({ handleEdit, handleCardEdit }) {
  //First, we create a state variable for the current deck associated with the URL.
  const [currentDeck, setCurrentDeck] = useState({});

  //We call upon the params contained within the browser's URL for future use.
  const params = useParams();
  //In our case, we are obtaining the deckId parameter from the URL.
  const deckId = params.deckId;
  //We call upon the useHistory hook as well for future use.
  const history = useHistory();

  //The following below is a style variable that removes the wrap-style of a given element.
  const noWrap = {
    whiteSpace: "nowrap",
  };

  /*
  Should a user click the delete button associated with the deck, the user will be prompted with a confirmation window.
  If they click "OK", the deck will be deleted using a "DELETE" request, and the user will be taken to the "Home Page" or DeckList display.
  */
  const handleDelete = async () => {
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(deckId);
      history.push("/");
    }
  };

  /*
  This invocation of the useEffect is to obtain the current deck's information from our server.
  This is accomplished through a "GET" request, and we then update the deck's state variable to contain the gathered information.
  If something goes wrong with the fetch, we have instantiated an abort the fetch, and we have a try/catch block to log any errors.
  */
  useEffect(() => {
    const ac = new AbortController();
    async function fetchCurrentDeck() {
      try {
        const response = await readDeck(deckId, ac.signal);
        setCurrentDeck(response);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted!");
        } else {
          console.log(error);
        }
      }
    }
    fetchCurrentDeck();
    return () => ac.abort();
  }, [deckId]);

  //If we recieve the data from the server call, the following will happen. Otherwise, we have a loading statement on the return.
  if (Object.keys(currentDeck).length) {

    //This maps out the cards associated with the current deck, destructures each card, and places its values inside of a CardView component for display.
    const cardViewList = currentDeck.cards.map(({ front, back, id }, index) => (
      <CardView
        key={index}
        front={front}
        back={back}
        cardId={id}
        deckId={deckId}
        handleCardEdit={handleCardEdit}
      />
    ));

    /*
    This return will display the given deck's information as well as the information of all cards held within and therefore created in the deck.
    There are also functionalities to add cards to a deck, study a given deck, edit a given deck, and delete a given deck.
    */
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active">{currentDeck.name}</li>
          </ol>
        </nav>
        <div>
          <h3>{currentDeck.name}</h3>
          <p>{currentDeck.description}</p>
        </div>
        <div className="row">
          <div className="col">
            <Link
              to={`/decks/${deckId}/edit`}
              className="btn btn-secondary"
              onClick={handleEdit}
              style={noWrap}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-pencil-fill"
                viewBox="0 0 16 16"
              >
                <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z" />
              </svg>{" "}
              Edit
            </Link>
          </div>
          <div className="col">
            <Link to={`/decks/${deckId}/study`} className="btn btn-primary" style={noWrap}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-journal-bookmark-fill"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 1h6v7a.5.5 0 0 1-.757.429L9 7.083 6.757 8.43A.5.5 0 0 1 6 8V1z"
                />
                <path d="M3 0h10a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-1h1v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H3a1 1 0 0 0-1 1v1H1V2a2 2 0 0 1 2-2z" />
                <path d="M1 5v-.5a.5.5 0 0 1 1 0V5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0V8h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1zm0 3v-.5a.5.5 0 0 1 1 0v.5h.5a.5.5 0 0 1 0 1h-2a.5.5 0 0 1 0-1H1z" />
              </svg>{" "}
              Study
            </Link>
          </div>
          <div className="col">
            <Link
              to={`/decks/${deckId}/cards/new`}
              className="btn btn-primary"
              style={noWrap}
            >
              + Add Cards
            </Link>
          </div>
          <div className="col"></div>
          <div className="col">
            <button
              type="button"
              onClick={handleDelete}
              className="btn btn-danger"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
              </svg>
            </button>
          </div>
        </div>
        <h2 className="my-3">Cards</h2>
        <div>{cardViewList}</div>
      </div>
    );
  } else {
    return "Loading Content...";
  }
}
