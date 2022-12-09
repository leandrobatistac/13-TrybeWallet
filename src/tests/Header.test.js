import { screen } from '@testing-library/react';
import React from 'react';
import Header from '../components/Header';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verifica se o componente Header', () => {
  test(' possui o campo de Email', () => {
    renderWithRouterAndRedux(<Header />);
    const inputEmail = screen.getByTestId('email-field');
    expect(inputEmail).toBeInTheDocument();
  });

  test(' possui o valor total', () => {
    renderWithRouterAndRedux(<Header />);
    const inputEmail = screen.getByTestId('total-field');
    expect(inputEmail).toBeInTheDocument();
  });

  test(' possui o texto BRL', () => {
    renderWithRouterAndRedux(<Header />);
    const inputEmail = screen.getByTestId('header-currency-field');
    expect(inputEmail).toBeInTheDocument();
  });
});
