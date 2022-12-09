import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { sendExpense, adicionarTotalValue } from '../redux/actions';

class Table extends Component {
  botaoDeletar = (id, value) => {
    const { wallet: { expenses, totalValue }, dispatch } = this.props;
    const arrayReduzido = expenses.filter((despesa) => despesa.id !== id);
    dispatch(sendExpense(arrayReduzido));

    const valorRemover = Number(value);
    const valorTotal = (totalValue - valorRemover);
    dispatch(adicionarTotalValue(valorTotal));
  };

  render() {
    const { wallet: { expenses } } = this.props;
    const objetoTitulos = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    return (
      <div>
        <table>
          <thead>
            <tr>
              { objetoTitulos.map((titulo) => (
                <th key={ titulo }>{ titulo }</th>
              )) }
            </tr>
          </thead>

          <tbody>
            {
              expenses.map((despesa) => {
                const nomeMoeda = Object.values(despesa.exchangeRates)
                  .find((moeda) => moeda.code === despesa.currency);
                return (
                  <tr key={ despesa.id }>
                    <td>{ despesa.description }</td>
                    <td>{ despesa.tag }</td>
                    <td>{ despesa.method }</td>
                    <td>{ Number(despesa.value).toFixed(2) }</td>
                    <td>{ nomeMoeda.name }</td>
                    <td>{ Number(nomeMoeda.ask).toFixed(2) }</td>
                    <td>{ Number(nomeMoeda.ask * despesa.value).toFixed(2) }</td>
                    <td> Real </td>
                    <td>
                      <button
                        type="button"
                        data-testid="delete-btn"
                        onClick={ () => this
                          .botaoDeletar(despesa.id, (despesa.value * nomeMoeda.ask)) }
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                );
              })
            }
          </tbody>

        </table>
      </div>
    );
  }
}

const mapStateToProps = (globalState) => ({
  wallet: globalState.wallet,
});

Table.propTypes = {
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape()),
    totalValue: PropTypes.number,
  }).isRequired,

  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Table);
