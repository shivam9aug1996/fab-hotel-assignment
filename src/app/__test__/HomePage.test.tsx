import HomePage from "@/app/page";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

describe("HomePage", () => {
  it("renders homepage", () => {
    const { container } = render(<HomePage />);
    expect(container).toMatchSnapshot();
  });
});
