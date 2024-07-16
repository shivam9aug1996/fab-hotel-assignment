import { render, screen, fireEvent } from "@testing-library/react";
import ResultItem from "../components/searchBox/ResultItem";

describe("ResultItem Component", () => {
  const mockOnClick = jest.fn();
  const href = "/test-link";

  const setup = (text: string, input: string) => {
    render(
      <ResultItem href={href} onClick={mockOnClick} text={text} input={input} />
    );
  };

  it("renders the Link component correctly", () => {
    setup("Test Hotel", "Hotel");
    const linkElement = screen.getByRole("link");
    expect(linkElement).toBeDefined();
  });

  it("highlights the input text correctly", () => {
    setup("Test Hotel", "Hotel");
    const highlightedText = screen.getByText("Hotel");
    expect(highlightedText).toBeDefined();
  });

  it("calls onClick when the link is clicked", () => {
    setup("Test Hotel", "Hotel");
    const linkElement = screen.getByRole("link");
    fireEvent.click(linkElement);
    expect(mockOnClick).toHaveBeenCalled();
  });

  it("handles text with commas correctly", () => {
    setup("Test Hotel, Location", "Hotel");
    const firstPart = screen.getByText("Test");
    const highlightedText = screen.getByText("Hotel");
    const restPart = screen.getByText(", Location");
    expect(firstPart).toBeDefined();
    expect(highlightedText).toBeDefined();
    expect(restPart).toBeDefined();
  });

  it("handles text without commas correctly", () => {
    setup("Test Hotel", "Hotel");
    const firstPart = screen.getByText("Test");
    const highlightedText = screen.getByText("Hotel");
    expect(firstPart).toBeDefined();
    expect(highlightedText).toBeDefined();
  });
});
