import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateCard, readCard } from "../../utils/api";
import CardForm from "./CardForm";

//This component contains the logic needed to produce a form for the "Edit Card" functionality.

export default function EditCard() {
  //We declare state variables for both the card's form of which we are editing and the parent deck of the card to edit.
  const [parentDeck, setParentDeck] = useState({});
  const [editCardObject, setEditCardObject] = useState({});

  //We utilize the useParams hook to gather the deckId and cardId parameters from the URL.
  const params = useParams();
  const thisDeckId = params.deckId;
  const cardId = params.cardId;
  const history = useHistory();

  //Fetch the Parent Deck for the current card and update parentDeck state variable.

  useEffect(() => {
    const ac = new AbortController();
    async function fetchParentDeck() {
      try {
        const deckFromAPI = await readDeck(thisDeckId, ac.signal);
        setParentDeck(deckFromAPI);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted Parent Deck Fetch");
        } else {
          console.log(error);
        }
      }
    }
    fetchParentDeck();
    return () => ac.abort();
  }, [thisDeckId]);

  //Fetch card data for current card using the cardId paramater from the path-
  //Then update the editCardObject with state information. This populates the textareas in our form.

  useEffect(() => {
    const abortController = new AbortController();
    async function fetchThisCard() {
      try {
        const cardFromAPI = await readCard(cardId, abortController.singal);
        setEditCardObject(cardFromAPI);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted Card Fetch");
        } else {
          console.log(error);
        }
      }
    }
    fetchThisCard();
    return () => abortController.abort();
  }, [cardId]);

  //This handles changes to the textareas within our form and updates the state of our editCardObject.
  const handleCardChange = ({ target }) => {
    setEditCardObject({
      ...editCardObject,
      [target.name]: target.value,
    });
  };

  //On form submission, this function will trigger and update the current card.
  //This is done with the information obtained from the form and within the editCardObject's state.
  const handleEditCardSubmit = async (e) => {
    e.preventDefault();
    await updateCard(editCardObject);
    history.push(`/decks/${thisDeckId}`);
  };

  //If cancel is clicked on the Edit form, it will go back to its parent deck's page.
  const handleEditCardCancel = () => {
    history.push(`decks/${thisDeckId}`);
  };

  //If the editCardObject and parentDeck have been populated with information from the useEffect call,
  //Return a CardForm component to pass down what we have obtained in state as props.
  //Otherwise, we display some sort of loading text.
  if (Object.keys(editCardObject).length && Object.keys(parentDeck).length) {
    return (
      <CardForm
        deckTitle={parentDeck.name}
        activeLinkDescription={`Edit Card: ${cardId}`}
        linkPath={`decks/${parentDeck.id}`}
        status={"Edit"}
        form={editCardObject}
        cancelHandler={handleEditCardCancel}
        submissionHandler={handleEditCardSubmit}
        changeHandler={handleCardChange}
        cancelButtonText={"Cancel"}
        submitButtonText={"Submit"}
      />
    );
  } else {
    return "Rendering Edit Page...";
  }
}
