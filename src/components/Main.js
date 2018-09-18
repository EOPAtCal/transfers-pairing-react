import React from 'react';

const Main = ({ matches, handleMatch, unmatchedMentors, unmatchedMentees }) => (
  <div>
    <div className="uk-margin uk-text-center">
      <button
        onClick={handleMatch}
        className="uk-button uk-button-danger uk-button-large uk-text-large"
      >
        <span uk-icon="heart" />
        Match
      </button>
    </div>
    <hr className="uk-divider-icon" />
    {matches.length > 0 && (
      <div
        className="uk-child-width-1-3@s uk-grid-small uk-grid-match"
        uk-grid=""
      >
        <div>
          <h2 className="uk-text-capitalize">mentor</h2>
        </div>
        <div>
          <h2 className="uk-text-capitalize">mentees</h2>
        </div>
        <div>
          <h2 className="uk-text-capitalize">reason</h2>
        </div>
      </div>
    )}
    <div>
      {matches.map(({ mentor, mentees, reason }) => (
        <div
          key={mentor}
          className="uk-child-width-1-3@s uk-grid-small uk-grid-match uk-card uk-card-default uk-card-small uk-card-body uk-card-hover"
          uk-grid=""
        >
          <ul className="uk-list uk-list-divider">
            <li>{mentor}</li>
          </ul>
          <ul className="uk-list uk-list-divider">
            {mentees.map((mentee, idx) => (
              <li key={idx}>
                {mentee}
                <button uk-icon="copy" />
              </li>
            ))}
          </ul>
          <ul className="uk-list uk-list-divider">
            {reason.map((r, idx) => (
              <li key={idx}>{r}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    {unmatchedMentees.length > 0 ||
      (unmatchedMentors.length > 0 && (
        <div
          className="uk-child-width-1-2@s uk-grid-small uk-grid-match uk-margin"
          uk-grid=""
        >
          <div>
            <h2 className="uk-text-capitalize">unmatched mentors</h2>
          </div>
          <div>
            <h2 className="uk-text-capitalize">unmatched mentees</h2>
          </div>
        </div>
      ))}
    <div>
      <div
        className="uk-child-width-1-2@s uk-grid-small uk-card uk-card-default uk-card-small uk-card-body"
        uk-grid=""
      >
        <ul className="uk-list uk-list-divider">
          {unmatchedMentors.map((mentor, idx) => (
            <li key={idx}>{mentor}</li>
          ))}
        </ul>
        <ul className="uk-list uk-list-divider">
          {unmatchedMentees.map((mentee, idx) => (
            <li key={idx}>{mentee}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default Main;
