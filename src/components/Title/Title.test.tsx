import { render, screen } from '@testing-library/react';
import Title from './Title';

describe('Title Component', () => {
  it('renders title text', () => {
    render(<Title />);
    expect(screen.getByText('Welcome to Weatherify')).toBeInTheDocument();
  });

  it('renders logo image', () => {
    render(<Title />);
    const logoImage = screen.getByAltText('weather');
    expect(logoImage).toBeInTheDocument();
    expect(logoImage).toHaveAttribute('width', '100');
  });
});
