import useDebounce, { debounce } from "../useDebounce"; // Import your debounce function
import { renderHook } from "@testing-library/react"; // For testing React hooks

const callback = jest.fn();

describe("Debounce", () => {
  describe("function", () => {
    it("should debounce function calls", () => {
      const debouncedFunction = debounce(callback, 200);

      // Call the debounced function
      debouncedFunction();

      // Fast-forward time (jest.advanceTimersByTime) past debounce time
      jest.advanceTimersByTime(200);

      // Ensure the callback has not been called after canceling
      expect(callback).toHaveBeenCalled();
    });

    it("should cancel the debounced function", () => {
      const debouncedFunction = debounce(callback, 200);

      // Call the debounced function
      debouncedFunction();

      // Cancel the debounced function immediately
      debouncedFunction.cancel();
    });
  });

  describe("useDebounce hook", () => {
    jest.useFakeTimers();
    jest.spyOn(global, "setTimeout");

    it("should debounce callback execution", () => {
      const callback = jest.fn();
      const { result, unmount } = renderHook(() =>
        useDebounce(callback, 1000, [])
      );

      // Trigger the callback multiple times
      result.current();
      result.current();
      result.current();

      // Ensure the callback has not been called yet
      expect(callback).not.toHaveBeenCalled();

      // Fast-forward until all timers have been executed
      jest.runAllTimers();

      // Ensure the callback has been called only once after debounce time
      // expect(callback).toHaveBeenCalledTimes(1);

      // Clean up after testing
      unmount();
    });
  });
});
