import React from "react";
import { Link, useHistory } from "react-router-dom";
import { deleteDeck } from "../../utils/api";

//This is a component for a singular Deck. This deck will be listed in our DeckList component (otherwise known as our "Home Page" or "/").

export default function Deck({ id, description, name, cards }) {
  //We first need to define the path to go to when a user clicks on the "Study" link.
  const studyPagePath = `/decks/${id}/study`;
  //We will use the useHistory hook for implementation in our delete handler.
  const history = useHistory();

  /*
  If a user clicks delete, this function will run.
  The function first prompts the user with a confirmation window, which if they click "OK", will delete this current deck and refresh the page.
  Otherwise, if "Cancel" is selected, the pop-up will be ignored.
  */
  const deleteHandler = async (e) => {
    e.preventDefault();
    if (
      window.confirm("Delete this deck? You will not be able to recover it.")
    ) {
      await deleteDeck(id);
      history.go(0);
    }
  };

  //This return displays all of the deck information as a Bootstrap card. It includes several of the props we have passed down from our DeckList component.
  return (
    <li>
      <div className="card mb-2">
        <div className="card-body">
          <div className="row">
            <div className="col-8">
              <h5 className="card-title">{name}</h5>
            </div>
            <div className="col-4">
              <p>{cards.length} cards</p>
            </div>
          </div>
          <p className="card-text">{description}</p>
          <div className="row">
            <div className="col-3 mx-auto">
              <Link to={`/decks/${id}`} className="btn btn-secondary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-fill"
                  viewBox="0 0 16 16"
                >
                  <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                  <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
                </svg>{" "}
                View
              </Link>
            </div>
            <div className="col-3 mx-auto">
              <Link to={studyPagePath} className="btn btn-primary">
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
            <div className="col-4"></div>
            <div className="col-2">
              <button
                type="button"
                className="btn btn-danger"
                onClick={deleteHandler}
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
        </div>
      </div>
    </li>
  );
}
