import React from 'react';

const Main = ({ matches, handleMatch, unmatchedMentors, unmatchedMentees }) => (
  <div>
    <div className="uk-flex-middle uk-flex-between" uk-grid="">
      <div>
        <h2 className="uk-text-lead uk-text-uppercase uk-margin-remove">
          results
        </h2>
      </div>
      <div>
        <button type="submit" className="uk-button uk-button-danger">
          <span uk-icon="cog" className="uk-margin-small-right" /> match
        </button>
      </div>
    </div>
    <hr />
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
    {unmatchedMentees.length > 0 ||
      (unmatchedMentors.length > 0 && (
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
      ))}
  </div>
);

export default Main;
