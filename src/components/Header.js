import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user: { email }, wallet: { totalValue } } = this.props;
    return (
      <div>

        <span data-testid="email-field">
          { email }
        </span>

        <span data-testid="total-field">
          { Number(totalValue
            .toLocaleString('en-IN')).toFixed(2) }
        </span>

        <span data-testid="header-currency-field">
          BRL
        </span>

      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  user: globalState.user,
  wallet: globalState.wallet,
});

Header.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,

  wallet: PropTypes.shape({
    totalValue: PropTypes.number,
  }).isRequired,
};

export default connect(mapStateToProps)(Header);
