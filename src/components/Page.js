import React, { Fragment } from 'react';
import Options from './Options';
import Main from './Main';

const Page = ({
  matches,
  options,
  handleChangeOptions,
  handleMatch,
  unmatchedMentors,
  unmatchedMentees
}) => (
  <Fragment>
    <div className="uk-width-auto@m">
      <ul
        className="uk-tab-left"
        uk-tab="connect: #component-tab-left; animation: uk-animation-fade"
      >
        <li>
          <a href="#">Results</a>
        </li>
        <li>
          <a href="#">Options</a>
        </li>
      </ul>
    </div>
    <div className="uk-width-expand@m">
      <ul id="component-tab-left" className="uk-switcher">
        <li>
          <Main
            handleMatch={handleMatch}
            matches={matches}
            unmatchedMentees={unmatchedMentees}
            unmatchedMentors={unmatchedMentors}
          />
        </li>
        <li>
          <Options
            options={options}
            handleChangeOptions={handleChangeOptions}
          />
        </li>
      </ul>
    </div>
  </Fragment>
);

export default Page;
