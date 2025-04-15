import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import Search from './Search';
import { autocomplete } from '../../services';

// Mock the services
jest.mock('../../services', () => ({
  autocomplete: jest.fn()
}));

const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('Search Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders search input', () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByLabelText('Enter City Name')).toBeInTheDocument();
  });

  it('shows "City not found" when no results and input length >= 3', async () => {
    (autocomplete as jest.Mock).mockResolvedValueOnce({ data: [] });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText('Enter City Name');
    fireEvent.change(input, { target: { value: 'Non' } });

    await waitFor(() => {
      expect(screen.getByText('City not found :(')).toBeInTheDocument();
    });
  });

  it('shows city results when API returns data', async () => {
    const mockCities = [{
      id: 1,
      name: 'London',
      region: 'City of London',
      country: 'UK',
      lat: 51.52,
      lon: -0.11
    }];

    (autocomplete as jest.Mock).mockResolvedValueOnce({ data: mockCities });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText('Enter City Name');
    fireEvent.change(input, { target: { value: 'London' } });

    await waitFor(() => {
      expect(screen.getByText('London, City of London, UK')).toBeInTheDocument();
    });
  });

  it('navigates to weather page when city is selected', async () => {
    const mockCities = [{
      id: 1,
      name: 'London',
      region: 'City of London',
      country: 'UK',
      lat: 51.52,
      lon: -0.11
    }];

    (autocomplete as jest.Mock).mockResolvedValueOnce({ data: mockCities });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText('Enter City Name');
    fireEvent.change(input, { target: { value: 'London' } });

    await waitFor(() => {
      fireEvent.click(screen.getByText('London, City of London, UK'));
    });

    expect(mockNavigate).toHaveBeenCalledWith('/weather/51.52,-0.11');
  });
});