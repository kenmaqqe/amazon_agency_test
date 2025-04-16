import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Weather from './Weather';
import { getWeather } from '../../services';

jest.mock('../../services', () => ({
  getWeather: jest.fn(() => Promise.resolve({ data: mockWeatherData }))
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
  useParams: () => ({ cityname: '51.52,-0.11' })
}));

const mockWeatherData = {
  current: {
    condition: { text: 'Sunny', icon: 'sunny-icon-url' },
    temp_c: 25,
    wind_kph: 10,
    wind_dir: 'N'
  },
  location: {
    name: 'London',
    region: 'City of London',
    country: 'UK'
  }
};

describe('Weather Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('fetches and displays weather data', async () => {
    (getWeather as jest.Mock).mockResolvedValueOnce({ data: mockWeatherData });

    render(
      <BrowserRouter>
        <Weather />
      </BrowserRouter>
    );

    expect(getWeather).toHaveBeenCalledWith(51.52, -0.11);
    expect(await screen.findByText('Sunny')).toBeInTheDocument();
  });

  it('navigates back when back button is clicked', () => {
    render(
      <BrowserRouter>
        <Weather />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Back'));
    expect(mockNavigate).toHaveBeenCalledWith('/');
  });

  it('clears localStorage when navigating back', () => {
    localStorage.setItem('weatherCache', JSON.stringify({ coords: '51.52,-0.11' }));
    
    render(
      <BrowserRouter>
        <Weather />
      </BrowserRouter>
    );

    fireEvent.click(screen.getByText('Back'));
    expect(localStorage.getItem('weatherCache')).toBeNull();
  });
});