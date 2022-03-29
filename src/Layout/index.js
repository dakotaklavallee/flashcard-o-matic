import React, { useState, useEffect } from "react";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api/index";
import DeckList from "./Decks/DeckList";
import { Route, Switch } from "react-router-dom";
import StudyPage from "./Cards/StudyPage";
import DeckPage from "./Decks/DeckPage";
import AddCard from "./Cards/AddCard";
import EditCard from "./Cards/EditCard";
import EditDeck from "./Decks/EditDeck";
import CreateDeck from "./Decks/CreateDeck";

//This component is treated almost as an "App.js" file, containing all of our page routes and rendering.
//It also contains the initial call towards our server for the decks that we use throughout the application.

function Layout() {
  //We declare a state variable for the decks we will be using. It is initialized to an empty array.
  const [decks, setDecks] = useState([]);

  /*
  The following useEffect hook is invoked to perform a "GET" request to our server via a fetch.
  Once the data is fetched, we populate our decks into the "decks" state variable.
  If any errors are produced, they will be logged accordingly. 
  Additionally, an AbortController is set up to abort if need be.
  */
  useEffect(() => {
    const ac = new AbortController();
    async function fetchDecks() {
      try {
        const response = await listDecks(ac.signal);
        setDecks(response);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted fetching decks");
        } else {
          console.log(error);
        }
      }
    }
    fetchDecks();
    return () => ac.abort();
  }, []);

  /* 
  This return will populate the screen of the user depending on the given link they are on.
  Utilizing a switch, we conditionally render a component to the display given the specified path.
  The Header component will be rendered always - it is only what is within the div with className of "container" that changes.
  */
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <DeckList decks={decks} />
          </Route>
          <Route path="/decks/:deckId/study">
            <StudyPage />
          </Route>
          <Route path="/decks/new">
            <CreateDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <EditDeck />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <AddCard />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <EditCard />
          </Route>
          <Route path="/decks/:deckId">
            <DeckPage />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
