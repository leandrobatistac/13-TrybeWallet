import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchCurrencies, sendExpense, adicionarTotalValue } from '../redux/actions';
import fetchAPI from '../fetchAPI';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  };

  handleButton = async () => {
    const { wallet: { expenses, totalValue } } = this.props;
    const {
      value,
      description,
      currency,
      method,
      tag,
    } = this.state;

    const { dispatch } = this.props;
    const exchange = await fetchAPI();
    delete exchange.USDT;
    const object = {
      id: expenses.length,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: exchange,
    };

    const completeArray = [...expenses, object];
    dispatch(sendExpense(completeArray));

    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });

    const valorPreenchido = Number(value);
    const conversao = valorPreenchido * exchange[currency].ask;
    const valorAcumulado = Number((totalValue + conversao).toFixed(2));
    dispatch(adicionarTotalValue(valorAcumulado));
  };

  render() {
    const { wallet: { currencies } } = this.props;
    const { value, description, currency, method, tag } = this.state;
    return (
      <div>
        <form>
          <label htmlFor="despesaValor">
            Valor da Despesa
            <input
              data-testid="value-input"
              id="despesaValor"
              name="value"
              onChange={ this.handleChange }
              value={ value }
            />
          </label>

          <label htmlFor="despesaDescricao">
            Descrição da Despesa
            <input
              data-testid="description-input"
              id="despesaDescricao"
              name="description"
              onChange={ this.handleChange }
              value={ description }
            />
          </label>

          <label htmlFor="despesaMoeda">
            Moeda
            <select
              data-testid="currency-input"
              id="despesaMoeda"
              name="currency"
              onChange={ this.handleChange }
              value={ currency }
            >
              { currencies.map((moeda) => (
                <option key={ moeda }>{ moeda }</option>
              )) }
            </select>
          </label>

          <label htmlFor="despesaPagamento">
            Método
            <select
              data-testid="method-input"
              id="despesaPagamento"
              name="method"
              value={ method }
              onChange={ this.handleChange }
            >
              <option>Dinheiro</option>
              <option>Cartão de crédito</option>
              <option>Cartão de débito</option>
            </select>
          </label>

          <label htmlFor="despesaCategoria">
            Categoria
            <select
              data-testid="tag-input"
              id="despesaCategoria"
              name="tag"
              value={ tag }
              onChange={ this.handleChange }
            >
              <option>Alimentação</option>
              <option>Lazer</option>
              <option>Trabalho</option>
              <option>Transporte</option>
              <option>Saúde</option>
            </select>
          </label>

          <button
            type="button"
            onClick={ () => this.handleButton() }
          >
            Adicionar Despesa
          </button>
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
    expenses: PropTypes.arrayOf(PropTypes.shape()),
    totalValue: PropTypes.number,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
