import React from 'react';
import Options from './Options';
import Main from './Main';

const Page = ({
  matches,
  options,
  handleChangeOptions,
  handleResetAllToDefaults,
  handleMatch,
  unmatchedMentors,
  unmatchedMentees
}) => (
  <div className="uk-container">
    <div>
      <ul className="uk-subnav uk-subnav-pill" uk-switcher="">
        <li>
          <a>Main</a>
        </li>
        <li>
          <a>Options</a>
        </li>
      </ul>

      <ul className="uk-switcher uk-margin">
        <li>
          <Main
            handleMatch={handleMatch}
            matches={matches}
            handleChangeOptions={handleChangeOptions}
            handleResetAllToDefaults={handleResetAllToDefaults}
            unmatchedMentees={unmatchedMentees}
            unmatchedMentors={unmatchedMentors}
          />
        </li>
        <li>
          <Options
            options={options}
            handleChangeOptions={handleChangeOptions}
            handleResetAllToDefaults={handleResetAllToDefaults}
          />
        </li>
      </ul>
    </div>
  </div>
);

export default Page;
