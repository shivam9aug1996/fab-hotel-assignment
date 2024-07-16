import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Page from "../hotel/detail/byPlace/[place]/page";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));
describe("DetailLayout", () => {
  const props = {
    params: { place: "Ahmedabad, Gujarat, India" },
  };

  it("api return invalid response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ data: {} }),
    });
    render(await Page(props));
    expect(
      screen.getByText("No hotels found for the given place.")
    ).toBeInTheDocument();
  });

  it("api return valid response", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({
        data: {
          byPlace: [
            {
              title: "FabHotel The Pearl",
              address: "Gurugram, India",
              hotelID: "ht456a001",
              description:
                "Being in a major corporate hub of the NCR, FabHotel The Pearl is one of the preferred budget hotels in Gurgaon among business travelers.",
            },
            {
              title: "FabHotel Tavishk",
              address: "Gurugram, India",
              hotelID: "ht456a002",
              description:
                "FabHotel Tavishk is among the most preferred budget hotels on Golf Course Road, Gurgaon.",
            },
          ],
        },
      }),
    });
    render(await Page(props));
    expect(screen.getAllByText("FabHotel Tavishk")[0]).toBeInTheDocument();
    expect(screen.getAllByText("Gurugram, India")[0]).toBeInTheDocument();

    expect(
      screen.getAllByText(
        "FabHotel Tavishk is among the most preferred budget hotels on Golf Course Road, Gurgaon."
      )[0]
    ).toBeInTheDocument();
  });
});
