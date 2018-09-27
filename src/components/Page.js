import React, { Fragment } from 'react';
import Options from './Options';
import Main from './Main';
import Empty from './Empty';

const getAllMatchingReasons = ({ userOptions, randomMatch, oneForOne }) =>
  [
    ...userOptions
      .filter(({ matchBy }) => matchBy === true)
      .map(({ name }) => name),
    ...(randomMatch ? ['random'] : ''),
    ...(oneForOne ? ['one for one'] : '')
  ].join(', ');

const Page = ({
  matches,
  options,
  handleChangeOptions,
  handleMatch,
  unmatchedMentors,
  unmatchedMentees
}) => (
  <Fragment>
    <ul
      className="uk-subnav uk-subnav-pill uk-flex-center"
      uk-switcher="animation: uk-animation-fade"
    >
      <li>
        <a>Results</a>
      </li>
      <li>
        <a>Options</a>
      </li>
    </ul>
    <ul className="uk-switcher uk-margin">
      <li>
        {matches.length === 0 &&
        unmatchedMentors.length === 0 &&
        unmatchedMentees.length === 0 ? (
          <Empty />
        ) : (
          <Main
            handleMatch={handleMatch}
            matches={matches}
            unmatchedMentees={unmatchedMentees}
            unmatchedMentors={unmatchedMentors}
            reasons={getAllMatchingReasons(options)}
          />
        )}
      </li>
      <li>
        <Options options={options} handleChangeOptions={handleChangeOptions} />
      </li>
    </ul>
  </Fragment>
);

export default Page;
