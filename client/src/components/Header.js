import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Payments from './Payments';

class Header extends Component {
  renderContent() {
    switch (this.props.isLoggedIn) {
      case null:
        return;
      case false:
        return (
          <li>
            <a href="/auth/google">Log In</a>
          </li>
        );
      default:
        return [
          <li key="credits">{this.props.isLoggedIn.credits} Credits</li>,
          <li key="payments">
            <a>
              <Payments />
            </a>
          </li>,
          <li key="logout">
            <a href="/api/logout">Log Out</a>
          </li>
        ];
    }
  }

  render() {
    return (
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to={this.props.isLoggedIn ? '/' : '/landing'}
              className="brand-logo"
            >
              Logo
            </Link>
            <ul id="nav-mobile" className="right">
              {this.renderContent()}
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

function mapStateToProps(state) {
  return {
    isLoggedIn: state.auth
  };
}

export default connect(mapStateToProps)(Header);
