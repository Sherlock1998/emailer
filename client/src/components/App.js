import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../actions';

import Header from './Header';
import Landing from './Landing';

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    return (
      <div>
        <Router>
          <div>
            <Header />
            <Route exact path="/landing" component={Landing} />
          </div>
        </Router>
      </div>
    );
  }
}

export default connect(null, actions)(App);
