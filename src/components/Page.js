import React from 'react';
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
  <div uk-grid="">
    <div className="uk-width-auto@m">
      <ul
        className="uk-tab-left"
        uk-tab="connect: #component-tab-left; animation: uk-animation-fade"
      >
        <li>
          <a>Results</a>
        </li>
        <li>
          <a>Options</a>
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
  </div>
);

export default Page;
