import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { wallet: { currencies } } = this.props;
    return (
      <div>
        <form>
          <label htmlFor="despesaValor">
            Valor da Despesa
            <input
              data-testid="value-input"
              id="despesaValor"
              name="despesaValor"
            />
          </label>

          <label htmlFor="despesaDescricao">
            Descrição da Despesa
            <input
              data-testid="description-input"
              id="despesaDescricao"
              name="despesaDescricao"
            />
          </label>

          <label htmlFor="despesaMoeda">
            Moeda
            <select
              data-testid="currency-input"
              id="despesaMoeda"
              name="despesaMoeda"
            >
              { currencies.map((moeda) => (
                <option key={ moeda }>{ moeda }</option>
              )) }
            </select>
          </label>

          <label htmlFor="despesaPagamento">
            Moeda
            <select
              data-testid="method-input"
              id="despesaPagamento"
              name="despesaPagamento"
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="despesaCategoria">
            Moeda
            <select
              data-testid="tag-input"
              id="despesaCategoria"
              name="despesaCategoria"
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

        </form>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
});

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
