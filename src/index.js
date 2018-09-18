import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import Page from './components/Page';
import handleClientLoad from './api';
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

  loadScript() {
    const script = document.createElement('script');
    script.src = 'https://apis.google.com/js/api.js';
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return script;
  }

  async componentDidMount() {
    // this.loadUIKit();
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
