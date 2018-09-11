import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import 'uikit/dist/css/uikit.min.css';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Page from './components/Page';
import handleClientLoad from './api';
import defaultsSPMP from './defaults/defaultsSPMP.json';
import defaultsMI from './defaults/defaultsMI.json';

class App extends PureComponent {
  state = {
    matchesMI: [],
    matchesSPMP: [],
    unmatchedMenteesMI: [],
    unmatchedMenteesSPMP: [],
    unmatchedMentorsMI: [],
    unmatchedMentorsSPMP: [],
    optionsSPMP: { key: 'SPMP', value: defaultsSPMP },
    optionsMI: { key: 'MI', value: defaultsMI }
  };

  handleChangeOptions = (key, value) => {
    this.setState({
      [`options${key}`]: { key, value }
    });
  };

  handleResetAllToDefaults = key => {
    if (window.confirm('Are you sure?')) {
      this.setState({
        [`options${key}`]:
          key === 'SPMP'
            ? { key, value: defaultsSPMP }
            : { key, value: defaultsMI }
      });
    }
  };

  handleMatch = async () => {
    const [
      {
        matches: matchesSPMP,
        unmatchedMentees: unmatchedMenteesSPMP,
        unmatchedMentors: unmatchedMentorsSPMP
      },
      {
        matches: matchesMI,
        unmatchedMentees: unmatchedMenteesMI,
        unmatchedMentors: unmatchedMentorsMI
      }
    ] = await this.fetch();
    this.setState({
      matchesMI,
      matchesSPMP,
      unmatchedMenteesMI,
      unmatchedMenteesSPMP,
      unmatchedMentorsMI,
      unmatchedMentorsSPMP
    });
  };

  async fetch() {
    const { optionsSPMP, optionsMI } = this.state;
    return await Promise.all([
      handleClientLoad(optionsSPMP.value),
      handleClientLoad(optionsMI.value)
    ]);
  }

  loadUIKit() {
    UIkit.use(Icons);
    window.UIkit = UIkit;
  }

  async componentDidMount() {
    this.loadUIKit();
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    script.onload = async () => {
      const [
        {
          matches: matchesSPMP,
          unmatchedMentees: unmatchedMenteesSPMP,
          unmatchedMentors: unmatchedMentorsSPMP
        },
        {
          matches: matchesMI,
          unmatchedMentees: unmatchedMenteesMI,
          unmatchedMentors: unmatchedMentorsMI
        }
      ] = await this.fetch();
      this.setState({
        matchesMI,
        matchesSPMP,
        unmatchedMenteesMI,
        unmatchedMenteesSPMP,
        unmatchedMentorsMI,
        unmatchedMentorsSPMP
      });
    };
  }

  render() {
    const {
      matchesMI = [],
      matchesSPMP = [],
      unmatchedMenteesMI = [],
      unmatchedMenteesSPMP = [],
      unmatchedMentorsSPMP = [],
      unmatchedMentorsMI = [],
      optionsSPMP,
      optionsMI
    } = this.state;
    return (
      <div className="uk-section uk-section-small uk-section-muted">
        <div className="uk-container">
          {/* Add buttons to initiate auth sequence and sign out */}
          <button id="authorize_button" style={{ display: 'none' }}>
            Authorize
          </button>
          <button id="signout_button" style={{ display: 'none' }}>
            Sign Out
          </button>
          <ul
            className="uk-subnav uk-subnav-pill uk-flex-center"
            uk-switcher=""
          >
            <li>
              <a>starting point mentorship program</a>
            </li>
            <li>
              <a>major insights</a>
            </li>
          </ul>
          <ul className="uk-switcher uk-margin">
            <li>
              <Page
                handleMatch={this.handleMatch}
                matches={matchesSPMP}
                options={optionsSPMP}
                unmatchedMentors={unmatchedMentorsSPMP}
                unmatchedMentees={unmatchedMenteesSPMP}
                handleChangeOptions={this.handleChangeOptions}
                handleResetAllToDefaults={this.handleResetAllToDefaults}
              />
            </li>
            <li>
              <Page
                handleMatch={this.handleMatch}
                matches={matchesMI}
                options={optionsMI}
                unmatchedMentees={unmatchedMenteesMI}
                unmatchedMentors={unmatchedMentorsMI}
                handleChangeOptions={this.handleChangeOptions}
                handleResetAllToDefaults={this.handleResetAllToDefaults}
              />
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
