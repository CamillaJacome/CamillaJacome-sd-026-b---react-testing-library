import { screen } from '@testing-library/react';
import React from 'react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente About', () => {
  test('se a página contém as informações sobre a Pokédex;', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    expect(history.location.pathname).toBe('/about');
  });
  test('se a página contém um heading h2 com o texto About Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const title = screen.getByRole('heading', {
      name: /about pokédex/i,
      level: 2,
    });
    expect(title).toBeInTheDocument();
  });
  test('se a página contém dois parágrafos com texto sobre a Pokédex', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const paragraph1 = screen.getByText('This application simulates a Pokédex, a digital encyclopedia containing all Pokémon');
    const paragraph2 = screen.getByText('One can filter Pokémon by type, and see more details for each one of them');
    expect(paragraph1).toBeInTheDocument();
    expect(paragraph2).toBeInTheDocument();
  });
  test('Teste se a página contém a seguinte imagem de uma Pokédex: "https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png"', () => {
    renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const imgPokedex = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', imgPokedex);
  });
});
