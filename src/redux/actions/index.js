import fetchAPI from '../../fetchAPI';

export const SEND_LOGIN = 'SEND_LOGIN';
export const sendLogin = (email) => ({
  type: SEND_LOGIN,
  payload: {
    email,
  },
});

// Action Types
export const REQUEST_CURRENCIES = 'REQUEST_CURRENCIES';
export const REQUEST_CURRENCIES_SUCESS = 'REQUEST_CURRENCIES_SUCESS';
export const REQUEST_CURRENCIES_ERROR = 'REQUEST_CURRENCIES_ERROR';

// Action Creator

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
