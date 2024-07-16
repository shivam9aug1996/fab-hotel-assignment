import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import DetailById from "../hotel/detail/byHotelId/[hotelID]/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));
describe("DetailLayout", () => {
  it("api return invalid response", async () => {
    const props = {
      params: { hotelID: "ht456a001" },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: {} }),
    });
    render(await DetailById(props));
    expect(screen.getAllByText("Failed to load data")[0]).toBeInTheDocument();
  });

  it("api return valid response", async () => {
    const props = {
      params: { hotelID: "ht456a001" },
    };

    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          byHotelId: {
            title: "FabHotel Tavishk",
            address: "Gurugram, India",
            description:
              "FabHotel Tavishk is among the most preferred budget hotels on Golf Course Road, Gurgaon.",
          },
        },
      }),
    });
    render(await DetailById(props));
    expect(screen.getByText("FabHotel Tavishk")).toBeInTheDocument();
    expect(screen.getByText("Gurugram, India")).toBeInTheDocument();
    expect(screen.getByText("Hotel ID: ht456a001")).toBeInTheDocument();
    expect(
      screen.getByText(
        "FabHotel Tavishk is among the most preferred budget hotels on Golf Course Road, Gurgaon."
      )
    ).toBeInTheDocument();
  });
});
