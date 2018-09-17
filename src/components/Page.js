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
  <div className="uk-container">
    <div uk-grid>
      <div class="uk-width-auto@m">
        <ul
          class="uk-tab-left"
          uk-tab="connect: #component-tab-left; animation: uk-animation-fade"
        >
          <li>
            <a href="#">Main</a>
          </li>
          <li>
            <a href="#">Options</a>
          </li>
        </ul>
      </div>
      <div class="uk-width-expand@m">
        <ul id="component-tab-left" className="uk-switcher uk-margin">
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
  </div>
);

export default Page;
