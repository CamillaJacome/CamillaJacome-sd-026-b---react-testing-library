import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente Pokemon', () => {
  test('se é renderizado um card com as informações de determinado Pokémon', () => {
    renderWithRouter(<App />);
    const name = screen.getByTestId('pokemon-name');
    expect(name).toHaveTextContent(/pikachu/i);
    const type = screen.getByTestId('pokemon-type');
    expect(type).toHaveTextContent(/electric/i);
    const weight = screen.getByTestId('pokemon-weight');
    expect(weight).toHaveTextContent(/Average weight: 6.0 kg/i);
    const img = screen.getByRole('img', {
      name: /pikachu sprite/i,
    });
    expect(img).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/b/b2/Spr_5b_025_m.png');
    expect(img).toHaveAttribute('alt', 'Pikachu sprite');
  });
  test(' se o card do Pokémon indicado na Pokédex contém um link de navegação para exibir detalhes deste Pokémon. O link deve possuir a URL /pokemon/<id>, onde <id> é o id do Pokémon exibido', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    expect(details.href.includes('/pokemon/25')).toBeTruthy();
  });
  test('se ao clicar no link de navegação do Pokémon, é feito o redirecionamento da aplicação para a página de detalhes de Pokémon', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const text = /this intelligent pokémon roasts hard berries with electricity to make them tender enough to eat\./i;
    const pokemonDetails = screen.getByText(text);
    expect(pokemonDetails).toBeInTheDocument();
  });
  test('se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver', () => {
    const { history } = renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    expect(history.location.pathname).toBe('/pokemon/25');
  });
  test('se existe um ícone de estrela nos Pokémon favoritados', () => {
    renderWithRouter(<App />);
    const details = screen.getByRole('link', { name: /more details/i });
    userEvent.click(details);
    const checkboxFavorite = screen.getByRole('checkbox', { name: /pokémon favoritado\?/i });
    userEvent.click(checkboxFavorite);
    const img = screen.getByRole('img', { name: /pikachu is marked as favorite/i });
    expect(img).toHaveAttribute('src', '/star-icon.svg');
  });
});
