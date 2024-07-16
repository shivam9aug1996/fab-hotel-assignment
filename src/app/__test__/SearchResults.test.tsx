import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { SearchResultsProps } from "../types";
import SearchResults from "../components/searchBox/SearchResults";

describe("SearchResults Component", () => {
  const mockHandleSelect = jest.fn();
  const defaultProps: SearchResultsProps = {
    googleData: { data: [] },
    hotelData: { data: [] },
    isFetchingGooglePlaceData: false,
    isFetchingHotelData: false,
    handleSelect: mockHandleSelect,
    input: "",
  };

  it("renders loading state", () => {
    render(
      <SearchResults {...defaultProps} isFetchingGooglePlaceData={true} />
    );
    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("renders no results found state", () => {
    render(<SearchResults {...defaultProps} />);
    expect(screen.getByText("No results found")).toBeInTheDocument();
  });

  it("renders google data results", () => {
    const googleData = {
      data: [
        { place_id: "1", description: "Google Place 1" },
        { place_id: "2", description: "Google Place 2" },
      ],
    };
    render(
      <SearchResults {...defaultProps} googleData={googleData} input="Place" />
    );
    expect(screen.getByText("Locations")).toBeDefined();
    expect(
      screen.queryAllByText((content, element) => {
        return element?.textContent === "Google Place 1";
      })[0]
    ).toBeInTheDocument();

    //expect();
  });

  it("renders hotel data results", () => {
    const hotelData = {
      data: [
        { hotelID: "1", item: "Hotel 1" },
        { hotelID: "2", item: "Hotel 2" },
      ],
    };
    render(
      <SearchResults {...defaultProps} hotelData={hotelData} input="Hotel" />
    );
    expect(screen.getByText("Hotels")).toBeInTheDocument();
    expect(
      screen.queryAllByText((content, element) => {
        return element?.textContent === "Hotel 1";
      })[0]
    ).toBeInTheDocument();
  });

  it("calls handleSelect when a result is clicked", () => {
    const googleData = {
      data: [{ place_id: "1", description: "Google Place 1" }],
    };
    render(
      <SearchResults {...defaultProps} googleData={googleData} input="Place" />
    );
    const resultItem = screen.queryAllByText((content, element) => {
      return element?.textContent === "Google Place 1";
    })[0];

    fireEvent.click(resultItem);
    expect(mockHandleSelect).toHaveBeenCalledWith("Google Place 1");
  });
});
