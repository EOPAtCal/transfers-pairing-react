import React, { PureComponent } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const getMentorLimit = limit => (limit.charAt(0) === '2' ? 8 : 4);

function InfoCard({ name, email, college, major, limit }) {
  return (
    <div uk-dropdown="pos: bottom-left; delay-hide: 0; animation: uk-animation-slide-bottom-small;">
      <div className="uk-card uk-card-body uk-card-small">
        <h4 className="uk-card-title">{name}</h4>
        <p>{email}</p>
        <p>{college}</p>
        <p>{major}</p>
        {limit && <div className="uk-label">{getMentorLimit(limit)}</div>}
      </div>
    </div>
  );
}

class ClipboardCopy extends PureComponent {
  state = {
    copied: false
  };

  handleCopy() {
    this.setState({ copied: true });
  }
  render() {
    return (
      <CopyToClipboard text={this.props.value} onCopy={this.handleCopy}>
        <button type="button" uk-icon="copy" />
      </CopyToClipboard>
    );
  }
}

const Main = ({
  matches,
  handleMatch,
  unmatchedMentors,
  unmatchedMentees,
  reasons
}) => (
  <div>
    <div>
      <div className="uk-flex-middle uk-flex-between" uk-grid="">
        <div>
          <h2 className="uk-text-lead uk-text-uppercase uk-margin-remove">
            results
          </h2>
        </div>
        <div>
          <p>
            <span className="uk-text-muted">matching by: </span>
            <strong>{reasons}</strong>
          </p>
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
      {matches.map(({ mentor, mentees, reasons }) => (
        <div
          key={mentor.id}
          className="uk-child-width-1-3@s uk-grid-small uk-card uk-card-default uk-card-small uk-card-body uk-card-hover"
          uk-grid=""
        >
          <ul className="uk-list">
            <div className="uk-inline">
              <li>
                {mentor.id}
                <ClipboardCopy value={mentor.email} />
              </li>
              <InfoCard
                name={mentor.name}
                email={mentor.email}
                college={mentor.college}
                major={mentor.major}
                limit={mentor.limit}
              />
            </div>
          </ul>
          <ul className="uk-list uk-list-divider">
            {mentees.map((mentee, idx) => [
              <li key={idx}>
                {mentee.id}
                <ClipboardCopy value={mentee.email} />
              </li>,
              <InfoCard
                name={mentee.name}
                key={mentee.email}
                email={mentee.email}
                college={mentee.college}
                major={mentee.major}
              />
            ])}
          </ul>
          <ul className="uk-list uk-list-divider">
            {reasons.map((reason, idx) => (
              <li key={idx}>{reason}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
    <hr />
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
        <div
          className="uk-child-width-1-2@s uk-grid-small uk-card uk-card-default uk-card-small uk-card-body"
          uk-grid=""
        >
          <ul className="uk-list uk-list-divider">
            {unmatchedMentors.map((mentor, idx) => [
              <li key={idx}>
                {mentor.id}
                <ClipboardCopy value={mentor.email} />
              </li>,
              <InfoCard
                name={mentor.name}
                key={mentor.email}
                email={mentor.email}
                college={mentor.college}
                major={mentor.major}
                limit={mentor.limit}
              />
            ])}
          </ul>
          <ul className="uk-list uk-list-divider">
            {unmatchedMentees.map((mentee, idx) => [
              <li key={idx}>
                {mentee.id}
                <ClipboardCopy value={mentee.email} />
              </li>,
              <InfoCard
                name={mentee.name}
                key={mentee.email}
                email={mentee.email}
                college={mentee.college}
                major={mentee.major}
              />
            ])}
          </ul>
        </div>
      </div>
    )}
  </div>
);

export default Main;
