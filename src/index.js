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
import defaults from './defaults.json';

class App extends PureComponent {
  state = {
    matches: [],
    unmatchedMentees: [],
    unmatchedMentors: [],
    options: App.getOptions(),
    isLoading: true
  };

  notifySucccess() {
    UIkit.notification({
      message: 'Saved!',
      status: 'success',
      pos: 'top-right',
      timeout: 5000
    });
  }

  notifyFailure() {
    UIkit.notification({
      message: 'Error!',
      status: 'danger',
      pos: 'top-left',
      timeout: 5000
    });
  }

  static getOptions() {
    let options;
    try {
      options = localStorage.getItem('options');
      if (!options) throw Error('no locally stored options');
      else options = JSON.parse(options);
    } catch (error) {
      options = defaults;
    }
    return options;
  }

  saveOptions = options => () => {
    localStorage.setItem('options', JSON.stringify(options));
    this.notifySucccess();
  };

  handleChangeOptions = (options, isValid) => {
    if (isValid) {
      this.setState(
        {
          options
        },
        this.saveOptions(options)
      );
    } else {
      this.notifyFailure();
    }
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
      unmatchedMentees = [],
      unmatchedMentors = [],
      options,
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
