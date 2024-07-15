import Footer from "@/app/components/Footer";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("Footer", () => {
  it("renders footer", () => {
    const { container } = render(<Footer />);
    expect(container).toMatchSnapshot();
  });
});
