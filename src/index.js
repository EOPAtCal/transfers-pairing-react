import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import Page from './components/Page';
import handleClientLoad from './api';
import 'uikit/dist/css/uikit.min.css';
import defaults from './defaults/defaults.json';

class App extends PureComponent {
  state = {
    matches: [],
    unmatchedMentees: [],
    unmatchedMentors: [],
    options: defaults
  };

  handleChangeOptions = options => {
    this.setState({
      options
    });
  };

  handleMatch = async () => {
    const { matches, unmatchedMentees, unmatchedMentors } = await this.fetch();
    this.setState({
      matches,
      unmatchedMentees,
      unmatchedMentors
    });
  };

  async fetch() {
    return await handleClientLoad(this.state.options);
  }

  loadUIKit() {
    UIkit.use(Icons);
    window.UIkit = UIkit;
  }

  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return script;
  }

  async componentDidMount() {
    this.loadUIKit();
    this.loadScript().onload = async () => {
      const {
        matches,
        unmatchedMentees,
        unmatchedMentors
      } = await this.fetch();
      this.setState({
        matches,
        unmatchedMentees,
        unmatchedMentors
      });
    };
  }

  render() {
    const {
      matches = [],
      unmatchedMentees = [],
      unmatchedMentors = [],
      options
    } = this.state;
    return (
      <div className="uk-section uk-section-small uk-section-muted">
        <div className="uk-container">
          <button
            className="uk-button uk-button-default"
            id="authorize_button"
            style={{ display: 'none' }}
          >
            Authorize
          </button>
          <button
            className="uk-button uk-button-default"
            id="signout_button"
            style={{ display: 'none' }}
          >
            Sign Out
          </button>
          <Page
            handleMatch={this.handleMatch}
            matches={matches}
            options={options}
            unmatchedMentors={unmatchedMentors}
            unmatchedMentees={unmatchedMentees}
            handleChangeOptions={this.handleChangeOptions}
          />
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
