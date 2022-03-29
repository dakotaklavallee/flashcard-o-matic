import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, updateDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

//This component contains the logic used when the "Edit Deck" screen is on display.

export default function EditDeckForm() {

  //We create a variable to utilize the useHistory hook later on.
  const historyFunc = useHistory();

  //We create a state variable to contain the information of the deck we are editing.
  //Currently, we are setting it to an empty object, but it will be populated later.
  const [editDeckObject, setEditDeckObject] = useState({});

  //We call upon the useParams hook to gather the current deck's deckId from the URL parameters.
  const params = useParams();
  const currentDeckId = params.deckId;

  //When a user clicks submit on the Edit page, we send an update request to the server, containinng the new body of the deck we want to populate.
  //After the deck is updated, the user is taken to the landing page for the deck they had updated.
  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    const updatedDeck = await updateDeck(editDeckObject);
    historyFunc.push(`/decks/${updatedDeck.id}`);
  };

  //Upon clicking cancel, the user should be taken back to the landing page for the deck of which they were intending to edit.
  const handleEditFormCancel = (e) => {
    historyFunc.push(`/decks/${currentDeckId}`);
  };

  //Similarly to creating a deck, 
  //When a user changes the input form values within the form, they should also change in our deck's edit state variable.
  const handleChange = ({ target }) => {
      setEditDeckObject({
        ...editDeckObject,
        [target.name]: target.value,
      });
  };

  /*
  This useEffect hook is called to fetch the current information contained within the deck.
  This information obtained from the "GET" request is then used to populate our state variable in this EditDeck component.
  The useEffect will also catch any errors and throw them accordingly.
  */
  useEffect(() => {
    const ac = new AbortController();
    async function fetchEditDeck() {
      try {
        const deckResponse = await readDeck(currentDeckId, ac.signal);
        setEditDeckObject(deckResponse);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted!");
        } else {
          console.log(error);
        }
      }
    }
    fetchEditDeck();
    return () => ac.abort;
  }, [currentDeckId]);

  //If the deck state variable has been succesfully populated, we will display a form with inputs that have been pre-filled with data from our editStateObject.
  //Otherwise, we will display text indicating loading.
  if (Object.keys(editDeckObject).length) {
    return <DeckForm
        status={"Edit"}
        submissionHandler={handleEditFormSubmit}
        cancelHandler={handleEditFormCancel}
        changeHandler={handleChange}
        form={editDeckObject}
         /> 
  } else {
    return "Rendering Data...";
  }
}
