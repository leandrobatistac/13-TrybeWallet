// Esse reducer será responsável por tratar as informações da pessoa usuária
const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  initialValue: 0, // Valor inicial da carteira
};

function user(state = INITIAL_STATE, action) {
  switch (action.type) {
  default:
    return state;
  }
}

export default user;
