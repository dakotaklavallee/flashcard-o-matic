import React from "react";
import { Link } from "react-router-dom";

//This component displays a form to the user's screen pertaining to adding or editing a card.
//It accepts function and data as props, given the user is either editing or adding a card.

export default function CardForm({
  linkPath,
  deckTitle,
  status,
  form,
  activeLinkDescription,
  cancelHandler,
  submissionHandler,
  changeHandler,
  cancelButtonText,
  submitButtonText,
}) {
  return (
    <form onSubmit={submissionHandler}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={linkPath}>{deckTitle}</Link>
          </li>
          <li className="breadcrumb-item active">{activeLinkDescription}</li>
        </ol>
      </nav>
      <h2>{status} Card</h2>
      <div className="form-group">
        <label htmlFor="name">Front</label>
        <textarea
          className="form-control"
          name="front"
          id="front"
          onChange={changeHandler}
          value={form.front}
        />
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          rows="3"
          onChange={changeHandler}
          value={form.back}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={cancelHandler}
          className="btn btn-secondary mr-3"
        >
          {cancelButtonText}
        </button>
        <button type="submit" className="btn btn-primary">
          {submitButtonText}
        </button>
      </div>
    </form>
  );
}
