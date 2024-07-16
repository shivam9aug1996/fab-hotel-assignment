import { render, screen, fireEvent } from "@testing-library/react";
import Input from "../components/searchBox/Input";
import { InputProps } from "../types";

describe("Input Component", () => {
  const mockHandleChange = jest.fn();
  const mockHandleClear = jest.fn();

  const setup = (inputValue = "") => {
    const props: InputProps = {
      input: inputValue,
      handleChange: mockHandleChange,
      handleClear: mockHandleClear,
    };

    render(<Input {...props} />);
  };

  it("renders the input element", () => {
    setup();
    expect(screen.getByPlaceholderText("Search hotels...")).toBeDefined();
  });

  it("calls handleChange when input value changes", () => {
    setup();
    const inputElement = screen.getByPlaceholderText("Search hotels...");
    fireEvent.change(inputElement, { target: { value: "new value" } });
    expect(mockHandleChange).toHaveBeenCalled();
  });

  it("calls handleClear when clear button is clicked", () => {
    setup("test");
    const clearButton = screen.getByRole("button");
    fireEvent.click(clearButton);
    expect(mockHandleClear).toHaveBeenCalled();
  });

  it("displays clear button only when there is input", () => {
    setup();
    expect(screen.queryByRole("button")).toBeNull();

    setup("test");
    expect(screen.getByRole("button")).toBeDefined();
  });
});
