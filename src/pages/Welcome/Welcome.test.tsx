import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Welcome from './Welcome';

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Welcome Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('renders title and search components', () => {
    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    expect(screen.getByText('Welcome to Weatherify')).toBeInTheDocument();
    expect(screen.getByLabelText('Enter City Name')).toBeInTheDocument();
  });

  it('redirects to weather page if valid cache exists', () => {
    const mockCache = {
      coords: '51.52,-0.11',
      timestamp: Date.now()
    };
    localStorage.setItem('weatherCache', JSON.stringify(mockCache));

    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    expect(mockNavigate).toHaveBeenCalledWith('/weather/51.52,-0.11', { replace: true });
  });

  it('clears invalid cache', () => {
    const mockCache = {
      coords: '51.52,-0.11',
      timestamp: Date.now() - 6 * 60 * 1000 // 6 minutes old (expired)
    };
    localStorage.setItem('weatherCache', JSON.stringify(mockCache));

    render(
      <BrowserRouter>
        <Welcome />
      </BrowserRouter>
    );

    expect(localStorage.getItem('weatherCache')).toBeNull();
  });
});