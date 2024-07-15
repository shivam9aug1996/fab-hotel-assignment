import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import DetailLayout from "../components/DetailLayout";

jest.mock("next/navigation", () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe("DetailLayout", () => {
  it("renders DetailLayout", () => {
    const { container } = render(
      <DetailLayout title="Test Title">{<></>}</DetailLayout>
    );
    expect(container).toMatchSnapshot();
  });
});
