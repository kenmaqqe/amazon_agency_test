import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Search from "./Search";
import { autocomplete } from "../../services";

jest.mock("../../services", () => ({
  autocomplete: jest.fn(),
}));

const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Search Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders search input", () => {
    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );
    expect(screen.getByLabelText("Enter City Name")).toBeInTheDocument();
  });

  it('shows "City not found" when no results and input length >= 3', async () => {
    (autocomplete as jest.Mock).mockResolvedValue({ data: [] });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText("Enter City Name");
    fireEvent.change(input, { target: { value: "Non" } });

    expect(
      await screen.findByText("City not found :(", {}, { timeout: 15000 })
    ).toBeInTheDocument();
  }, 20000);

  it("shows city results when API returns data", async () => {
    const mockCities = [
      {
        id: 1,
        name: "London",
        region: "City of London",
        country: "UK",
        lat: 51.52,
        lon: -0.11,
      },
    ];

    (autocomplete as jest.Mock).mockResolvedValue({ data: mockCities });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText("Enter City Name");
    fireEvent.change(input, { target: { value: "London" } });

    expect(
      await screen.findByText(
        "London, City of London, UK",
        {},
        { timeout: 15000 }
      )
    ).toBeInTheDocument();
  }, 20000);

  it("navigates to weather page when city is selected", async () => {
    const mockCities = [
      {
        id: 1,
        name: "London",
        region: "City of London",
        country: "UK",
        lat: 51.52,
        lon: -0.11,
      },
    ];

    (autocomplete as jest.Mock).mockResolvedValue({ data: mockCities });

    render(
      <BrowserRouter>
        <Search />
      </BrowserRouter>
    );

    const input = screen.getByLabelText("Enter City Name");
    fireEvent.change(input, { target: { value: "London" } });

    const cityResult = await screen.findByText(
      "London, City of London, UK",
      {},
      { timeout: 15000 }
    );
    fireEvent.click(cityResult);

    expect(mockNavigate).toHaveBeenCalledWith("/weather/51.52,-0.11");
  }, 20000);
});
