import React, { PureComponent } from 'react';
import Center from './Center';

export default class ErrorBoundary extends PureComponent {
  state = {
    error: false
  };

  componentDidCatch(error, info) {
    this.setState({ error: true });
  }

  render() {
    if (this.state.error) {
      return (
        <Center>
          <p>an error has occurred</p>
        </Center>
      );
    }
    return this.props.children;
  }
}
