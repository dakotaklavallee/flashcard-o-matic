import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readDeck, createCard } from "../../utils/api";
import CardForm from "./CardForm";

//This component contains all of the logic necessary to add a card to a given deck.

export default function AddCard() {
  //We declare an initial state for a card to be initialized or re-initialized to.
  const initialCardState = {
    front: "",
    back: "",
  };

  //We declare state variables for both the card form's state and its parent deck's state.
  //The card's form is initialized to the contents of the initialization variable, and the parent deck is initialized to an object.
  const [cardForm, setCardForm] = useState({ ...initialCardState });
  const [parentDeck, setParentDeck] = useState({});

  //We call upon the useParams hook to gather the deckId from the URL.
  const params = useParams();
  const thisDeckId = params.deckId;

  //We call upon useHistory to utilize for later on in the function.
  const history = useHistory();

  //This variable contains the path to the parent deck of which the cards being added.
  const linkPath = `decks/${thisDeckId}`;

  /*
  This useEffect hook is called to gather information from the parent deck via a "GET" request.
  The gathered information contained in the returned object is then used to populate the parent deck's state variable.
  If there are any errors, they are logged, and an abort controller is set to abort if necessary.
  */
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

  //Upon a user entering text into the given input fields of the card's form, this will update the state variable for the card accordingly.
  const handleCardChange = ({ target }) => {
    setCardForm({
      ...cardForm,
      [target.name]: target.value,
    });
  };

  //When a user clicks save on the card's form, it will create a card based on the current state of the card's form,
  //and then upon completion, will initialize the card form's state, allowing the user to create further cards.
  const handleAddCardSave = async (e) => {
    e.preventDefault();
    await createCard(thisDeckId, cardForm);
    setCardForm(initialCardState);
  };

  //When a user clicks on "Done" in the card's form, they will return to the parent deck's landing page.
  const handleAddCardDone = () => {
    history.push(`decks/${thisDeckId}`);
  };

  //If the parent deck's state variable is successfully populated, the form will display,
  //with information obtained from the parent deck passed down as props, and other given functions passed down as well.
  //Otherwise, loading text is displayed.
  if (Object.keys(parentDeck).length) {
    return (
      <CardForm
        linkPath={linkPath}
        deckTitle={parentDeck.name}
        status={"Add"}
        form={cardForm}
        activeLinkDescription={"Add Card"}
        cancelHandler={handleAddCardDone}
        submissionHandler={handleAddCardSave}
        changeHandler={handleCardChange}
        cancelButtonText={"Done"}
        submitButtonText={"Save"}
      />
    );
  } else {
    return "Loading Add Card Form...";
  }
}
