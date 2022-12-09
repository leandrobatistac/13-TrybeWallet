import {
  REQUEST_CURRENCIES,
  REQUEST_CURRENCIES_ERROR,
  REQUEST_CURRENCIES_SUCESS,
  SEND_EXPENSE,
  TOTAL_VALUE } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  totalValue: 0,
  isLoading: false,
};

function wallet(state = INITIAL_STATE, action) {
  switch (action.type) {
  case REQUEST_CURRENCIES: {
    return {
      ...state,
      isLoading: true,
    };
  }

  case REQUEST_CURRENCIES_SUCESS: {
    return {
      ...state,
      isLoading: false,
      currencies: action.payload.currencies,
    };
  }

  case REQUEST_CURRENCIES_ERROR: {
    return {
      ...state,
      isLoading: false,
      errorMessage: action.payload.error.message || 'Erro',
    };
  }

  case SEND_EXPENSE: {
    return {
      ...state,
      expenses: action.payload.expenses,
    };
  }

  case TOTAL_VALUE: {
    return {
      ...state,
      totalValue: action.payload.total,
    };
  }

  default: return state;
  }
}

export default wallet;
