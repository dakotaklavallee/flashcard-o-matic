import React from "react";
import Deck from "./Deck";
import { Link } from "react-router-dom";

//This is a component to host a list of Deck items (which are also components).
//This component also serves as our "Home Page" and is rendered on "/".

export default function DeckList({ decks }) {
  //We define a style for our "<ul>" tagged element as to remove all current default stylings.
  const ulStyle = {
    listStyleType: "none",
    padding: 0,
  };

  //This will map through our passed-in "decks" prop, which is an array of currently obtained decks from the state variable maintained in index.js.
  //This will re-map when rendered.
  //Additionally, every deck is deconstructed for its values, and then those values are passed down as props for a Deck component.
  const deckMap = decks.map(({ id, name, description, cards }) => (
    <Deck
      key={id}
      id={id}
      name={name}
      description={description}
      cards={cards}
    />
  ));

  //This return displays the current list of Deck components as list items within a <ul> tag.
  //There is also a link displayed that, when clicked, will take a user to the "Create Deck" page.
  return (
    <div>
      <Link to="/decks/new" className="btn btn-secondary px-3 mb-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-plus"
          viewBox="0 0 16 16"
        >
          <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
        </svg>{" "}
        Create Deck
      </Link>
      <ul style={ulStyle}>{deckMap}</ul>
    </div>
  );
}
