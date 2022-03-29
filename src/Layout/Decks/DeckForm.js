import React from "react";
import { Link } from "react-router-dom";

//This is a re-usable form component for Creating and Editing Decks. It displays input fields and buttons that utilize props.

export default function DeckForm({
  status,
  submissionHandler,
  cancelHandler,
  changeHandler,
  form,
}) {
  return (
    <form onSubmit={submissionHandler}>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active">{status} Deck</li>
        </ol>
      </nav>
      <h2>{status} Deck</h2>
      <div className="form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          className="form-control"
          name="name"
          id="name"
          onChange={changeHandler}
          value={form.name}
        />
      </div>
      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          className="form-control"
          id="description"
          name="description"
          rows="3"
          onChange={changeHandler}
          value={form.description}
        />
      </div>
      <div>
        <button
          type="button"
          onClick={cancelHandler}
          className="btn btn-secondary mr-3"
        >
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </div>
    </form>
  );
}
