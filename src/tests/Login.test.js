import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Verifica se a Página de Login', () => {
  test(' possui o input de Email', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();
  });

  test(' possui o input de Senha', () => {
    renderWithRouterAndRedux(<Login />);
    const inputSenha = screen.getByTestId('password-input');
    expect(inputSenha).toBeInTheDocument();
  });

  test(' possui o botão de Entrar', () => {
    renderWithRouterAndRedux(<Login />);
    const botaoEntrar = screen.getByRole('button', { name: /Entrar/i });
    expect(botaoEntrar).toBeInTheDocument();
  });

  test(' desabilita o botão ao incluir Email errado', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputSenha = screen.getByTestId('password-input');
    const botaoEntrar = screen.getByRole('button', { name: /Entrar/i });

    userEvent.type(inputEmail, 'leandro');
    userEvent.type(inputSenha, '123456');
    expect(botaoEntrar.disabled).toBe(true);

    userEvent.type(inputEmail, 'leandro@gmail.com');
    userEvent.type(inputSenha, '123456');
    userEvent.click(botaoEntrar);
    expect(botaoEntrar.disabled).toBe(false);
  });
});
