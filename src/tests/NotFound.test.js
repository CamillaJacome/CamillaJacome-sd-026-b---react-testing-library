import { screen, act } from '@testing-library/react';
import React from 'react';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('testa o componente NotFound', () => {
  test('se a página contém um heading h2 com o texto Page requested not found', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/unkown');
    });
    const notFound = screen.getByRole('heading', {
      name: /page requested not found/i,
      level: 2,
    });
    expect(notFound).toBeInTheDocument();
  });

  test('se a página mostra a imagem "https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif"', () => {
    const { history } = renderWithRouter(<App />);
    act(() => {
      history.push('/unknown');
    });
    const img = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const image = screen.getByRole('img'); expect(image.src).toBe(img);
  });
});
