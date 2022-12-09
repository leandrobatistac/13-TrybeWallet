import React from 'react';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Página Home (App)', () => {
  test('Verifica se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<App />);
  });
});
