import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createDeck } from "../../utils/api";
import DeckForm from "./DeckForm";

export default function CreateDeck() {
  //Set the initial form data for the deck state to empty strings
  const initialDeckFormData = {
    name: "",
    description: "",
  };

  //Utilize useHistory for later
  const historyFunc = useHistory();

  //Set the state of our deck variable to the initial form data.
  const [deckFormData, setDeckFormData] = useState({ ...initialDeckFormData });

  /*When a user clicks submit, we want to create a new deck. 
  This deck contains the user input information stored within the deck variable's state.
  After the deck has been created, we set the deck variable back to its initial state for a future creation, 
  and then we send the user to the new deck's landing page. */
  const handleCreateFormSubmit = async (e) => {
    e.preventDefault();
    const createdDeck = await createDeck(deckFormData);
    setDeckFormData(initialDeckFormData);
    historyFunc.push(`/decks/${createdDeck.id}`);
  };

  //When a user clicks cancel, they go to the home page.
  const handleCreateFormCancel = (e) => {
    historyFunc.push("/");
  };

  //On the change of an input field, the corresponding state value should update and be stored.
  const handleChange = ({ target }) => {
    setDeckFormData({
      ...deckFormData,
      [target.name]: target.value,
    });
  };

  //This displays the form. We are passing in our previously created functions and state into the component as props.
  return (
    <DeckForm
      status={"Create"}
      submissionHandler={handleCreateFormSubmit}
      cancelHandler={handleCreateFormCancel}
      changeHandler={handleChange}
      form={deckFormData}
    />
  );
}
