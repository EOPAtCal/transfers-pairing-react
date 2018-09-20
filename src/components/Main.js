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
        <button
          type="submit"
          className="uk-button uk-button-danger"
          onClick={handleMatch}
        >
          <span uk-icon="cog" className="uk-margin-small-right" /> match
        </button>
      </div>
    </div>
    <hr />
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
    <div>
      {matches.map(({ mentor, mentees, reasons }) => (
        <div
          key={mentor.id}
          className="uk-child-width-1-3@s uk-grid-small uk-grid-match uk-card uk-card-default uk-card-small uk-card-body uk-card-hover"
          uk-grid=""
        >
          <ul className="uk-list">
            <li>{mentor.id}</li>
          </ul>
          <ul className="uk-list uk-list-divider">
            {mentees.map((mentee, idx) => (
              <li key={idx}>
                {mentee.id}
                <button uk-icon="copy" />
              </li>
            ))}
          </ul>
          <ul className="uk-list uk-list-divider">
            {reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <hr className="uk-divider-icon" />
    {(unmatchedMentees.length > 0 || unmatchedMentors.length > 0) && (
      <div>
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
        <div>
          <div
            className="uk-child-width-1-2@s uk-grid-small uk-card uk-card-default uk-card-small uk-card-body"
            uk-grid=""
          >
            <ul className="uk-list uk-list-divider">
              {unmatchedMentors.map((mentor, idx) => (
                <li key={idx}>
                  {mentor.id}
                  <button uk-icon="copy" />
                </li>
              ))}
            </ul>
            <ul className="uk-list uk-list-divider">
              {unmatchedMentees.map((mentee, idx) => (
                <li key={idx}>
                  {mentee.id}
                  <button uk-icon="copy" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )}
  </div>
);

export default Main;
