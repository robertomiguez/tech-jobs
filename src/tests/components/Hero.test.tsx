import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MemoryRouter } from 'react-router-dom';
import Hero from '../../components/Hero';

describe('Hero Component', () => {
  const hero = {
    title: 'DEV',
    subTitle: 'SUBDEV',
  };
  test('renders Hero component', () => {
    render(
      <MemoryRouter>
        <Hero {...hero} />
      </MemoryRouter>
    );
    const element = screen.getByText(/DEV/i);
    expect(element).toBeInTheDocument();
  });
});
