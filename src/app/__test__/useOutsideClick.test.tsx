import { render, screen, fireEvent } from "@testing-library/react";
import { useEffect, useRef } from "react";
import useOutsideClick from "../hooks/useOutsideClick";

// Create a test component to use the hook
const TestComponent = ({
  onClickOutside,
  enabled,
}: {
  onClickOutside: () => void;
  enabled: boolean;
}) => {
  const ref = useOutsideClick(onClickOutside, enabled);

  return (
    <div>
      <div
        data-testid="inside"
        ref={ref}
        style={{ padding: "20px", background: "lightblue" }}
      >
        Inside
      </div>
      <div
        data-testid="outside"
        style={{ padding: "20px", background: "lightcoral" }}
      >
        Outside
      </div>
    </div>
  );
};

describe("useOutsideClick", () => {
  it("calls the callback when clicking outside the referenced element", () => {
    const handleClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={handleClickOutside} enabled={true} />
    );

    // Click outside the element
    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleClickOutside).toHaveBeenCalledTimes(1);
  });

  it("does not call the callback when clicking inside the referenced element", () => {
    const handleClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={handleClickOutside} enabled={true} />
    );

    // Click inside the element
    fireEvent.mouseDown(screen.getByTestId("inside"));

    expect(handleClickOutside).not.toHaveBeenCalled();
  });

  it("does not call the callback when disabled", () => {
    const handleClickOutside = jest.fn();
    render(
      <TestComponent onClickOutside={handleClickOutside} enabled={false} />
    );

    // Click outside the element
    fireEvent.mouseDown(screen.getByTestId("outside"));

    expect(handleClickOutside).not.toHaveBeenCalled();
  });
});
