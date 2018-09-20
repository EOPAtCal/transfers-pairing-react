import React, { PureComponent, StrictMode } from 'react';
import { render } from 'react-dom';
import UIkit from 'uikit';
import Icons from 'uikit/dist/js/uikit-icons';
import '../node_modules/uikit/dist/css/uikit.min.css';
import './index.css';
import Page from './components/Page';
import ErrorBoundary from './components/ErrorBoundary';
import Loading from './components/Loading';
import handleClientLoad from './api';
import defaults from './defaults/defaults.json';

class App extends PureComponent {
  state = {
    matches: [],
    unmatchedMentees: [],
    unmatchedMentors: [],
    options: defaults,
    isLoading: true
  };

  notify() {
    UIkit.notification({
      message: 'Saved!',
      status: 'default',
      pos: 'top-right',
      timeout: 5000
    });
  }

  handleChangeOptions = options => {
    this.setState(
      {
        options
      },
      this.notify
    );
  };

  handleMatch = async () => {
    this.setState({
      isLoading: true
    });
    const { matches, unmatchedMentees, unmatchedMentors } = await this.fetch();
    this.setState({
      matches,
      unmatchedMentees,
      unmatchedMentors,
      isLoading: false
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
        unmatchedMentors,
        isLoading: false
      });
    };
  }

  render() {
    const {
      matches = [],
      unmatchedMentees,
      unmatchedMentors,
      options = {},
      isLoading
    } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
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

render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
  document.getElementById('root')
);
