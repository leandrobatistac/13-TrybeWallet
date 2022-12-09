import fetchAPI from '../../fetchAPI';

// Action Types

export const SEND_LOGIN = 'SEND_LOGIN';
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCESS = 'REQUEST_CURRENCIES_SUCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';
export const SEND_EXPENSE = 'SEND_EXPENSE';
export const TOTAL_VALUE = 'TOTAL_VALUE';

// Action Creator

export const sendLogin = (email) => ({
  type: SEND_LOGIN,
  payload: {
    email,
  },
});

export const requestCurrencies = () => ({
  type: REQUEST_CURRENCIES,
});

const responseCurrenciesSucess = (moedas) => ({
  type: REQUEST_CURRENCIES_SUCESS,
  payload: {
    currencies: Object.keys(moedas),
  },
});

const responseCurrenciesError = (error) => ({
  type: REQUEST_CURRENCIES_ERROR,
  payload: {
    error,
  },
});

export const fetchCurrencies = () => async (dispatch) => {
  dispatch(requestCurrencies());
  try {
    const response = await fetchAPI();
    delete response.USDT;
    dispatch(responseCurrenciesSucess(response));
  } catch (error) {
    dispatch(responseCurrenciesError(error));
  }
};

export const sendExpense = (expenses) => ({
  type: SEND_EXPENSE,
  payload: {
    expenses,
  },
});

export const totalValue = (total) => ({
  type: TOTAL_VALUE,
  payload: {
    total,
  },
});
