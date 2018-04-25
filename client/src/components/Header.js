import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Header extends Component {
  renderContent() {
    switch (this.props.isLoggedIn) {
      case null:
        return;
      case false:
        return <a href="/auth/google">Log In</a>;
      default:
        return <a href="/api/logout">Log Out</a>;
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className="container">
          <div className="nav-wrapper">
            <Link
              to={this.props.isLoggedIn ? '/survey' : '/'}
              className="brand-logo"
            >
              Logo
            </Link>
            <ul id="nav-mobile" className="right hide-on-med-and-down">
              <li>{this.renderContent()}</li>
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
