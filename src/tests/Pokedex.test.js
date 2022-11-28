import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testa o componente Pokedex', () => {
  test('se a página contém um heading h2 com o texto Encountered Pokémon', () => {
    renderWithRouter(<App />);
    const heading = screen.getByRole('heading', {
      name: /encountered pokémon/i,
      level: 2,
    });
    expect(heading).toBeInTheDocument();
  });
  test('se é exibido o próximo Pokémon da lista quando o botão Próximo Pokémon é clicado', () => {
    renderWithRouter(<App />);
    const buttonProximo = screen.getByRole('button', { name: /próximo pokémon/i });
    userEvent.click(buttonProximo);
    const proximo = screen.getByText(/charmander/i);
    expect(proximo).toBeInTheDocument();
  });
  test('se é mostrado apenas um Pokémon por vez', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  test('se a Pokédex tem os botões de filtro', () => {
    const filters = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ];
    renderWithRouter(<App />);
    const typeButton = screen.getAllByTestId('pokemon-type-button');
    typeButton.forEach((pokemon, i) => {
      expect(pokemon).toHaveTextContent(filters[i]);
    });
  });
  test('se a Pokédex contém um botão para resetar o filtro:', () => {
    renderWithRouter(<App />);
    const buttonAll = screen.getByRole('button', { name: /all/i });
    expect(buttonAll).toBeVisible();
    userEvent.click(buttonAll);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
  });
});
