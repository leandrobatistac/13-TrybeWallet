import { screen } from '@testing-library/react';
import React from 'react';
import WalletForm from '../components/WalletForm';
import Header from '../components/Header';
import Table from '../components/Table';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verifica se o componente WallerForm', () => {
  test(' possui o input de Valor', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValor = screen.getByTestId('value-input');
    expect(inputValor).toBeInTheDocument();
  });

  test(' possui o input de Descrição', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValor = screen.getByTestId('description-input');
    expect(inputValor).toBeInTheDocument();
  });

  test(' possui o input de Moeda', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValor = screen.getByTestId('currency-input');
    expect(inputValor).toBeInTheDocument();
  });

  test(' possui o input de Método', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValor = screen.getByTestId('method-input');
    expect(inputValor).toBeInTheDocument();
  });

  test(' possui o input de Tag', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const inputValor = screen.getByTestId('tag-input');
    expect(inputValor).toBeInTheDocument();
  });

  test(' possui o botão de Adicionar Despesa', () => {
    renderWithRouterAndRedux(<WalletForm />);
    const botaoEntrar = screen.getByRole('button', { name: /Adicionar Despesa/i });
    expect(botaoEntrar).toBeInTheDocument();
  });

  test('Verifica se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Header />);
  });

  test('Verifica se a página é renderizada corretamente', () => {
    renderWithRouterAndRedux(<Table />);
  });
});
