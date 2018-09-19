import React, { PureComponent } from 'react';
import { render } from 'react-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
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

  loadUIkit() {
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
    this.loadUIkit();
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
      options = {}
    } = this.state;
    return (
      <Page
        handleMatch={this.handleMatch}
        options={options}
        matches={matches}
        unmatchedMentors={unmatchedMentors}
        unmatchedMentees={unmatchedMentees}
        handleChangeOptions={this.handleChangeOptions}
      />
    );
  }
}

const rootElement = document.getElementById('root');
render(<App />, rootElement);
