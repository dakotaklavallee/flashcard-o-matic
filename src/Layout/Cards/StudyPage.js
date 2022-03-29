import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";
import { readDeck } from "../../utils/api";
import StudyCard from "./StudyCard";
import NotEnoughCards from "./NotEnoughCards";

//This component contains the logic of which is needed to execute the functionality of a study card.

export default function StudyPage() {
  //We utilize the useParams hook to gather the deck's id from the URL given the deckId parameter.
  const params = useParams();
  const deckId = params.deckId;

  /*
  We declare several state variables here.
  The studyCards variable contains the state for all possible cards to study in a given deck, and it is initialized to an empty array.
  The cardIndex variable contains the given index of the card of which is being actively studied. It is initialized to index of 0.
  The side variable contains the active side of a given card being studied. It is initialized to "front" by default.
  The deck variable contains the information of the given deck being studied. It is initialized to an empty object.
  */
  const [studyCards, setStudyCards] = useState([]);
  const [cardIndex, setCardIndex] = useState(0);
  const [side, setSide] = useState("front");
  const [deck, setDeck] = useState({});

  //We create a variable to utilize the useHistory hook for later.
  const history = useHistory();

  /*
  This useEffect is called upon to make a "GET" request to our server to obtain a given deck's information.
  Upon receiving that information, we update the state of our deck and studyCards state variables to contain the given information.
  If there are any errors, they will be logged accordingly, and if need be, the AbortController can handle an abort of the fetch.
  */
  useEffect(() => {
    const ac = new AbortController();
    async function fetchStudyCards() {
      try {
        const response = await readDeck(deckId, ac.signal);
        setDeck(response);
        setStudyCards(response.cards);
      } catch (error) {
        if (error.type === "AbortError") {
          console.log("Aborted fetching the study deck.");
        } else {
          console.log(error);
        }
      }
    }
    fetchStudyCards();
    return () => ac.abort();
  }, [deckId]);

  //This is a variable to hold the total cards available for studying.
  const cardNum = studyCards.length;

  /*
  This function contains the logic for advancing a card when studying a deck.
  If a card reaches the final card of a given set and next is clicked, it will propmpt the user with a confirmation window to restart the deck.
  If "OK" is selected, the deck will reset to index 0, and the side shown will be the front.
  Otherwise, when next is clicked, it will advance to the next index card in the deck and show its front side.
  */
  const handleNext = (e) => {
    e.preventDefault();
    if (cardIndex === studyCards.length - 1) {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setCardIndex(0);
        setSide("front");
      } else {
        history.push("/");
      }
    } else {
      setCardIndex((cardIndex) => cardIndex + 1);
      setSide("front");
    }
  };

  //This function contains the logic for the flip button of a card.
  const flipHandler = (e) => {
    e.preventDefault();
    if (side === "front") {
      setSide("back");
    } else {
      setSide("front");
    }
  };

  //If we recieve the data from our "GET" request, we are going to conduct a find on the cards within the populated deck state.
  //We're storing this card as the "current card", and we use this as a reference for the active card displaying in the study view.
  //Our return populates the display and allows the user to interact with the study features, according to the current card's data.
  //Otherwise, some form of loading text is shown.
  if (Object.keys(deck).length) {
    const currentCard = deck.cards.find((card, index) => index === cardIndex);
    return (
      <div>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item">
              <Link to={`/decks/${deckId}`}>{deck.name}</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Study
            </li>
          </ol>
        </nav>
        <h1 className="mb-3">Study: {deck.name}</h1>
        {deck.cards.length < 3 ? (
          <NotEnoughCards cards={studyCards} />
        ) : (
          <StudyCard
            front={currentCard.front}
            back={currentCard.back}
            cardIndex={cardIndex}
            At
            totalCards={cardNum}
            handleNext={handleNext}
            flipHandler={flipHandler}
            side={side}
          />
        )}
      </div>
    );
  } else {
    return "Loading Deck...";
  }
}
