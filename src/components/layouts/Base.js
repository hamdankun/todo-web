import React, { Component } from 'react';
import Header from './Header';
import Footer from './Footer';
import ProgressBarArea from './ProgressBarArea';

class Base extends Component {
  render() {
    return (
      <div>
        <ProgressBarArea />
        <Header />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

export default Base;
