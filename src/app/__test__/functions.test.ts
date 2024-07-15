import { debounce } from "../utils/functions";

describe("debounce", () => {
  jest.useFakeTimers(); // Use fake timers for controlling setTimeout

  it("should debounce function calls", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 1000);

    debouncedFn("arg1");
    debouncedFn("arg2");

    // Verify the function is not called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Verify the function is called once with the latest arguments
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("arg2");
  });

  it("should debounce function calls with default delay", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn);

    debouncedFn("arg1");

    // Verify the function is not called immediately
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time
    jest.advanceTimersByTime(1000);

    // Verify the function is called once with the latest arguments
    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("arg1");
  });

  it("should clear previous timeout and set new one", () => {
    const mockFn = jest.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn("arg1");
    jest.advanceTimersByTime(200);

    debouncedFn("arg2");
    jest.advanceTimersByTime(300);

    // Verify the function is not called before the delay has passed
    expect(mockFn).not.toHaveBeenCalled();

    // Fast-forward time to ensure function is called with the last argument
    jest.advanceTimersByTime(200);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("arg2");
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear any pending timers after each test
  });
});
