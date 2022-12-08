import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { sendLogin } from '../redux/actions';

class LoginForm extends Component {
  constructor() {
    super();

    this.state = {
      botaoDisable: true,
      loginEmail: '',
      loginPassword: '',
    };
  }

  validateEmail = (email) => {
    const result = /\S+@\S+\.\S+/;
    return result.test(email);
  };

  handleChange = ({ target: { name, value } }) => {
    const passwordSize = 6;
    this.setState({ [name]: value }, () => {
      const { loginEmail, loginPassword } = this.state;
      if (loginPassword.length >= passwordSize && this.validateEmail(loginEmail)) {
        this.setState({ botaoDisable: false });
      } else {
        this.setState({ botaoDisable: true });
      }
    });
  };

  render() {
    const { dispatch } = this.props;
    const { botaoDisable, loginEmail } = this.state;
    return (
      <div>
        Login
        <form>
          <label htmlFor="loginEmail">
            Email
            <input
              data-testid="email-input"
              id="loginEmail"
              name="loginEmail"
              onChange={ this.handleChange }
            />
          </label>

          <label htmlFor="loginPassword">
            Senha
            <input
              data-testid="password-input"
              id="loginPassword"
              name="loginPassword"
              onChange={ this.handleChange }
            />
          </label>

          <Link to="/carteira">
            <button
              type="button"
              data-testid="login-submit-button"
              disabled={ botaoDisable }
              onClick={ () => dispatch(sendLogin(loginEmail)) }
            >
              Entrar
            </button>
          </Link>
        </form>
      </div>
    );
  }
}

LoginForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (globalState) => {
  console.log(globalState);
  return {
    email: globalState.user.email,
  };
};

export default connect(mapStateToProps)(LoginForm);
