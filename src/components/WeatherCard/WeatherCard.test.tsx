import { render, screen } from '@testing-library/react';
import WeatherCard from './WeatherCard';

const mockWeatherData = {
  current: {
    condition: {
      text: 'Sunny',
      icon: 'sunny-icon-url',
      code: 1000
    },
    temp_c: 25,
    wind_kph: 10,
    wind_dir: 'N',
    last_updated: '2024-01-01 12:00'
  },
  location: {
    name: 'London',
    region: 'City of London',
    country: 'UK'
  }
};

describe('WeatherCard Component', () => {
  it('renders weather information correctly', () => {
    render(<WeatherCard {...mockWeatherData} />);

    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('25°C')).toBeInTheDocument();
    expect(screen.getByText('Wind speed: 10 km/h')).toBeInTheDocument();
    expect(screen.getByText('Wind direction: N')).toBeInTheDocument();
    expect(screen.getByText('London, City of London, UK')).toBeInTheDocument();
  });

  it('renders weather icon', () => {
    render(<WeatherCard {...mockWeatherData} />);
    const icon = screen.getByAltText('Sunny');
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveAttribute('src', 'sunny-icon-url');
  });

  it('shows last update time when date is provided', () => {
    const testDate = new Date('2023-01-01T12:00:00');
    render(<WeatherCard {...mockWeatherData} date={testDate} />);
    expect(screen.getByText(`Last update at: ${testDate.toLocaleString()}`)).toBeInTheDocument();
  });
});