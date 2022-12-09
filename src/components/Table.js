import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class Table extends Component {
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
                      <button type="button">
                        Excluir/Alterar
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
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
